"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Post, Company } from "@/app/types";
import { createOrUpdatePost } from "@/lib/api";
import { useLoadingState } from "@/lib/hooks/useLoadingState";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

// Zod 스키마 정의
const reportSchema = z.object({
  title: z
    .string()
    .min(1, "제목을 입력해주세요")
    .max(200, "제목은 200자 이하로 입력해주세요"),
  content: z
    .string()
    .min(1, "내용을 입력해주세요")
    .max(5000, "내용은 5000자 이하로 입력해주세요"),
  resourceId: z.string().min(1, "회사를 선택해주세요")
});

type ReportFormData = z.infer<typeof reportSchema>;

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  report?: Post | null;
  companies: Company[];
}

export function ReportModal({
  isOpen,
  onClose,
  onSuccess,
  report,
  companies
}: ReportModalProps) {
  const { loadingState, setLoadingState, setError } = useLoadingState("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
      resourceId: ""
    }
  });

  const watchedValues = watch();

  // 폼 초기화
  useEffect(() => {
    if (report) {
      reset({
        title: report.title,
        content: report.content,
        resourceId: report.resourceId
      });
    } else {
      reset();
    }
    setError(null);
  }, [report, isOpen, reset, setError]);

  // 폼 제출 핸들러
  const onSubmit = async (data: ReportFormData) => {
    setLoadingState("loading");
    setError(null);

    try {
      await createOrUpdatePost({
        id: report?.id,
        title: data.title.trim(),
        content: data.content.trim(),
        resourceId: data.resourceId,
        dateTime: new Date().toISOString()
      });

      setLoadingState("success");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("보고서 저장 실패:", error);
      setError(
        error instanceof Error
          ? error.message
          : "보고서 저장 중 오류가 발생했습니다."
      );
      setLoadingState("error");
    }
  };

  const handleClose = () => {
    if (loadingState !== "loading") {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{report ? "보고서 편집" : "새 보고서 작성"}</DialogTitle>
          <DialogDescription>
            {report
              ? "기존 보고서를 수정합니다."
              : "새로운 지속가능성 보고서를 작성합니다."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company">기업 선택 *</Label>
            <Select
              value={watchedValues.resourceId}
              onValueChange={(value) => setValue("resourceId", value)}
              disabled={loadingState === "loading"}
            >
              <SelectTrigger
                className={errors.resourceId ? "border-red-500" : ""}
              >
                <SelectValue placeholder="기업을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name} ({company.country})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.resourceId && (
              <p className="text-sm text-red-600">
                {errors.resourceId.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">보고서 제목 *</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="보고서 제목을 입력하세요"
              disabled={loadingState === "loading"}
              className={errors.title ? "border-red-500" : ""}
              maxLength={200}
            />
            <div className="flex justify-between items-center">
              {errors.title ? (
                <p className="text-sm text-red-600">{errors.title.message}</p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {watchedValues.title?.length || 0}/200자
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">보고서 내용 *</Label>
            <Textarea
              id="content"
              {...register("content")}
              placeholder="보고서 내용을 입력하세요"
              rows={8}
              disabled={loadingState === "loading"}
              className={errors.content ? "border-red-500" : ""}
              maxLength={5000}
            />
            <div className="flex justify-between items-center">
              {errors.content ? (
                <p className="text-sm text-red-600">{errors.content.message}</p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {watchedValues.content?.length || 0}/5000자
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loadingState === "loading"}
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={loadingState === "loading" || !isValid}
            >
              {report ? "수정하기" : "작성하기"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
