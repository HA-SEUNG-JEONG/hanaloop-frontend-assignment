/**
 * 공통 모달 컴포넌트
 * 
 * 디자인 의사결정:
 * - 일관된 모달 UI 패턴
 * - 재사용 가능한 모달 구조
 * - 접근성 고려
 * - 로딩 상태 관리
 */

import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "./LoadingSpinner";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function BaseModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  isLoading = false,
  loadingText = "처리 중...",
  size = "md",
  className
}: BaseModalProps) {
  const sizeClasses = {
    sm: "sm:max-w-[400px]",
    md: "sm:max-w-[600px]",
    lg: "sm:max-w-[800px]",
    xl: "sm:max-w-[1000px]"
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={`${sizeClasses[size]} ${className || ""}`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>

        <div className="space-y-4">
          {children}
        </div>

        {footer && (
          <DialogFooter>
            {footer}
          </DialogFooter>
        )}

        {isLoading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
            <div className="flex items-center space-x-2">
              <LoadingSpinner size="sm" />
              <span className="text-sm text-muted-foreground">{loadingText}</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// 공통 모달 버튼 컴포넌트
interface ModalButtonProps {
  onCancel: () => void;
  onSubmit: () => void;
  isLoading?: boolean;
  submitText?: string;
  cancelText?: string;
  isSubmitDisabled?: boolean;
  submitVariant?: "default" | "destructive";
}

export function ModalButtons({
  onCancel,
  onSubmit,
  isLoading = false,
  submitText = "확인",
  cancelText = "취소",
  isSubmitDisabled = false,
  submitVariant = "default"
}: ModalButtonProps) {
  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isLoading}
      >
        {cancelText}
      </Button>
      <Button
        type="submit"
        variant={submitVariant}
        onClick={onSubmit}
        disabled={isLoading || isSubmitDisabled}
      >
        {isLoading ? (
          <>
            <LoadingSpinner size="sm" className="mr-2" />
            {submitText} 중...
          </>
        ) : (
          submitText
        )}
      </Button>
    </>
  );
}
