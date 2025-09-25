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
  }, [report, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.content.trim() ||
      !formData.resourceId
    ) {
      setError("모든 필드를 입력해주세요.");
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
            <Label htmlFor="company">기업 선택</Label>
            <Select
              value={formData.resourceId}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, resourceId: value }))
              }
              disabled={loadingState === "loading"}
            >
              <SelectTrigger>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">보고서 제목</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="보고서 제목을 입력하세요"
              disabled={loadingState === "loading"}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">보고서 내용</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              placeholder="보고서 내용을 입력하세요"
              rows={8}
              disabled={loadingState === "loading"}
              required
            />
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
            <Button type="submit" disabled={loadingState === "loading"}>
              {report ? "수정하기" : "작성하기"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
