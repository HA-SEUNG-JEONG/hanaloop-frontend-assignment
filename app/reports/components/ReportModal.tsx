"use client";

import { useState, useEffect } from "react";
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
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    resourceId: ""
  });

  const [validationErrors, setValidationErrors] = useState<{
    title?: string;
    content?: string;
    resourceId?: string;
  }>({});

  const { loadingState, setLoadingState, setError } = useLoadingState("idle");

  // 폼 초기화
  useEffect(() => {
    if (report) {
      setFormData({
        title: report.title,
        content: report.content,
        resourceId: report.resourceId
      });
    } else {
      setFormData({
        title: "",
        content: "",
        resourceId: ""
      });
    }
    setValidationErrors({});
    setError(null);
  }, [report, isOpen]);

  // 유효성 검증 함수
  const validateForm = () => {
    const errors: typeof validationErrors = {};

    // 제목 검증
    if (!formData.title.trim()) {
      errors.title = "보고서 제목을 입력해주세요.";
    } else if (formData.title.trim().length < 2) {
      errors.title = "제목은 최소 2자 이상이어야 합니다.";
    } else if (formData.title.trim().length > 100) {
      errors.title = "제목은 100자를 초과할 수 없습니다.";
    }

    // 내용 검증
    if (!formData.content.trim()) {
      errors.content = "보고서 내용을 입력해주세요.";
    } else if (formData.content.trim().length < 10) {
      errors.content = "내용은 최소 10자 이상이어야 합니다.";
    } else if (formData.content.trim().length > 5000) {
      errors.content = "내용은 5000자를 초과할 수 없습니다.";
    }

    // 기업 선택 검증
    if (!formData.resourceId) {
      errors.resourceId = "기업을 선택해주세요.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // 실시간 유효성 검증
  const validateField = (field: keyof typeof formData, value: string) => {
    const errors = { ...validationErrors };

    switch (field) {
      case "title":
        if (!value.trim()) {
          errors.title = "보고서 제목을 입력해주세요.";
        } else if (value.trim().length < 2) {
          errors.title = "제목은 최소 2자 이상이어야 합니다.";
        } else if (value.trim().length > 100) {
          errors.title = "제목은 100자를 초과할 수 없습니다.";
        } else {
          delete errors.title;
        }
        break;
      case "content":
        if (!value.trim()) {
          errors.content = "보고서 내용을 입력해주세요.";
        } else if (value.trim().length < 10) {
          errors.content = "내용은 최소 10자 이상이어야 합니다.";
        } else if (value.trim().length > 5000) {
          errors.content = "내용은 5000자를 초과할 수 없습니다.";
        } else {
          delete errors.content;
        }
        break;
      case "resourceId":
        if (!value) {
          errors.resourceId = "기업을 선택해주세요.";
        } else {
          delete errors.resourceId;
        }
        break;
    }

    setValidationErrors(errors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검증
    if (!validateForm()) {
      setError("입력 정보를 확인해주세요.");
      return;
    }

    setLoadingState("loading");
    setError(null);

    try {
      await createOrUpdatePost({
        id: report?.id,
        title: formData.title.trim(),
        content: formData.content.trim(),
        resourceId: formData.resourceId,
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company">기업 선택 *</Label>
            <Select
              value={formData.resourceId}
              onValueChange={(value) => {
                setFormData((prev) => ({ ...prev, resourceId: value }));
                validateField("resourceId", value);
              }}
              disabled={loadingState === "loading"}
            >
              <SelectTrigger
                className={validationErrors.resourceId ? "border-red-500" : ""}
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
            {validationErrors.resourceId && (
              <p className="text-sm text-red-600">
                {validationErrors.resourceId}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">보고서 제목 *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, title: e.target.value }));
                validateField("title", e.target.value);
              }}
              placeholder="보고서 제목을 입력하세요"
              disabled={loadingState === "loading"}
              className={validationErrors.title ? "border-red-500" : ""}
              maxLength={100}
            />
            <div className="flex justify-between items-center">
              {validationErrors.title ? (
                <p className="text-sm text-red-600">{validationErrors.title}</p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {formData.title.length}/100자
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">보고서 내용 *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, content: e.target.value }));
                validateField("content", e.target.value);
              }}
              placeholder="보고서 내용을 입력하세요"
              rows={8}
              disabled={loadingState === "loading"}
              className={validationErrors.content ? "border-red-500" : ""}
              maxLength={5000}
            />
            <div className="flex justify-between items-center">
              {validationErrors.content ? (
                <p className="text-sm text-red-600">
                  {validationErrors.content}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {formData.content.length}/5000자
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
              disabled={
                loadingState === "loading" ||
                !formData.title.trim() ||
                !formData.content.trim() ||
                !formData.resourceId
              }
            >
              {report ? "수정하기" : "작성하기"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
