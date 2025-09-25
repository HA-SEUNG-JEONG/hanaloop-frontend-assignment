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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Company } from "@/app/types";
import { createCompany } from "@/lib/api";
import { useLoadingState } from "@/lib/hooks/useLoadingState";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

interface CompanyCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CompanyCreateModal({
  isOpen,
  onClose,
  onSuccess
}: CompanyCreateModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    businessType: "",
    industry: "",
    establishedYear: "",
    employeeCount: "",
    revenue: ""
  });

  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    country?: string;
    businessType?: string;
    industry?: string;
    establishedYear?: string;
    employeeCount?: string;
    revenue?: string;
  }>({});

  const { loadingState, error, setLoadingState, setError } =
    useLoadingState("idle");

  // 폼 초기화
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        country: "",
        businessType: "",
        industry: "",
        establishedYear: "",
        employeeCount: "",
        revenue: ""
      });
      setValidationErrors({});
      setError(null);
    }
  }, [isOpen]);

  // 유효성 검증 함수
  const validateForm = () => {
    const errors: typeof validationErrors = {};

    // 회사명 검증
    if (!formData.name.trim()) {
      errors.name = "회사명을 입력해주세요.";
    } else if (formData.name.trim().length < 2) {
      errors.name = "회사명은 최소 2자 이상이어야 합니다.";
    } else if (formData.name.trim().length > 100) {
      errors.name = "회사명은 100자를 초과할 수 없습니다.";
    }

    // 국가 검증
    if (!formData.country) {
      errors.country = "국가를 선택해주세요.";
    }

    // 사업 유형 검증
    if (!formData.businessType) {
      errors.businessType = "사업 유형을 선택해주세요.";
    }

    // 산업 분야 검증
    if (!formData.industry) {
      errors.industry = "산업 분야를 선택해주세요.";
    }

    // 설립년도 검증
    if (!formData.establishedYear) {
      errors.establishedYear = "설립년도를 입력해주세요.";
    } else {
      const year = parseInt(formData.establishedYear);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1800 || year > currentYear) {
        errors.establishedYear = `설립년도는 1800년부터 ${currentYear}년 사이여야 합니다.`;
      }
    }

    // 직원 수 검증
    if (!formData.employeeCount) {
      errors.employeeCount = "직원 수를 입력해주세요.";
    } else {
      const count = parseInt(formData.employeeCount);
      if (isNaN(count) || count < 1 || count > 10000000) {
        errors.employeeCount = "직원 수는 1명 이상 1천만 명 이하여야 합니다.";
      }
    }

    // 연매출 검증
    if (!formData.revenue) {
      errors.revenue = "연매출을 입력해주세요.";
    } else {
      const revenue = parseFloat(formData.revenue);
      if (isNaN(revenue) || revenue < 0 || revenue > 1000000) {
        errors.revenue = "연매출은 0억원 이상 100만억원 이하여야 합니다.";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // 실시간 유효성 검증
  const validateField = (field: keyof typeof formData, value: string) => {
    const errors = { ...validationErrors };

    switch (field) {
      case "name":
        if (!value.trim()) {
          errors.name = "회사명을 입력해주세요.";
        } else if (value.trim().length < 2) {
          errors.name = "회사명은 최소 2자 이상이어야 합니다.";
        } else if (value.trim().length > 100) {
          errors.name = "회사명은 100자를 초과할 수 없습니다.";
        } else {
          delete errors.name;
        }
        break;
      case "country":
        if (!value) {
          errors.country = "국가를 선택해주세요.";
        } else {
          delete errors.country;
        }
        break;
      case "businessType":
        if (!value) {
          errors.businessType = "사업 유형을 선택해주세요.";
        } else {
          delete errors.businessType;
        }
        break;
      case "industry":
        if (!value) {
          errors.industry = "산업 분야를 선택해주세요.";
        } else {
          delete errors.industry;
        }
        break;
      case "establishedYear":
        if (!value) {
          errors.establishedYear = "설립년도를 입력해주세요.";
        } else {
          const year = parseInt(value);
          const currentYear = new Date().getFullYear();
          if (isNaN(year) || year < 1800 || year > currentYear) {
            errors.establishedYear = `설립년도는 1800년부터 ${currentYear}년 사이여야 합니다.`;
          } else {
            delete errors.establishedYear;
          }
        }
        break;
      case "employeeCount":
        if (!value) {
          errors.employeeCount = "직원 수를 입력해주세요.";
        } else {
          const count = parseInt(value);
          if (isNaN(count) || count < 1 || count > 10000000) {
            errors.employeeCount =
              "직원 수는 1명 이상 1천만 명 이하여야 합니다.";
          } else {
            delete errors.employeeCount;
          }
        }
        break;
      case "revenue":
        if (!value) {
          errors.revenue = "연매출을 입력해주세요.";
        } else {
          const revenue = parseFloat(value);
          if (isNaN(revenue) || revenue < 0 || revenue > 1000000) {
            errors.revenue = "연매출은 0억원 이상 100만억원 이하여야 합니다.";
          } else {
            delete errors.revenue;
          }
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
      await createCompany({
        name: formData.name.trim(),
        country: formData.country,
        businessType: formData.businessType,
        industry: formData.industry,
        establishedYear: parseInt(formData.establishedYear),
        employeeCount: parseInt(formData.employeeCount),
        revenue: parseFloat(formData.revenue),
        subsidiaries: [],
        emissions: []
      });

      setLoadingState("success");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("회사 생성 실패:", error);
      setError(
        error instanceof Error
          ? error.message
          : "회사 생성 중 오류가 발생했습니다."
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
          <DialogTitle>새 회사 등록</DialogTitle>
          <DialogDescription>
            새로운 기업을 시스템에 등록합니다.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">회사명 *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, name: e.target.value }));
                  validateField("name", e.target.value);
                }}
                placeholder="회사명을 입력하세요"
                disabled={loadingState === "loading"}
                className={validationErrors.name ? "border-red-500" : ""}
                maxLength={100}
              />
              <div className="flex justify-between items-center">
                {validationErrors.name ? (
                  <p className="text-sm text-red-600">
                    {validationErrors.name}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {formData.name.length}/100자
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">국가 *</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, country: value }));
                  validateField("country", value);
                }}
                disabled={loadingState === "loading"}
              >
                <SelectTrigger
                  className={validationErrors.country ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="국가를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KR">대한민국 (KR)</SelectItem>
                  <SelectItem value="US">미국 (US)</SelectItem>
                  <SelectItem value="CN">중국 (CN)</SelectItem>
                  <SelectItem value="JP">일본 (JP)</SelectItem>
                  <SelectItem value="DE">독일 (DE)</SelectItem>
                  <SelectItem value="GB">영국 (GB)</SelectItem>
                  <SelectItem value="FR">프랑스 (FR)</SelectItem>
                  <SelectItem value="IN">인도 (IN)</SelectItem>
                  <SelectItem value="BR">브라질 (BR)</SelectItem>
                  <SelectItem value="CA">캐나다 (CA)</SelectItem>
                </SelectContent>
              </Select>
              {validationErrors.country && (
                <p className="text-sm text-red-600">
                  {validationErrors.country}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessType">사업 유형 *</Label>
              <Select
                value={formData.businessType}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, businessType: value }));
                  validateField("businessType", value);
                }}
                disabled={loadingState === "loading"}
              >
                <SelectTrigger
                  className={
                    validationErrors.businessType ? "border-red-500" : ""
                  }
                >
                  <SelectValue placeholder="사업 유형을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="제조업">제조업</SelectItem>
                  <SelectItem value="서비스업">서비스업</SelectItem>
                  <SelectItem value="유통업">유통업</SelectItem>
                  <SelectItem value="건설업">건설업</SelectItem>
                  <SelectItem value="금융업">금융업</SelectItem>
                  <SelectItem value="IT업">IT업</SelectItem>
                  <SelectItem value="에너지업">에너지업</SelectItem>
                  <SelectItem value="화학업">화학업</SelectItem>
                  <SelectItem value="자동차업">자동차업</SelectItem>
                  <SelectItem value="기타">기타</SelectItem>
                </SelectContent>
              </Select>
              {validationErrors.businessType && (
                <p className="text-sm text-red-600">
                  {validationErrors.businessType}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">산업 분야 *</Label>
              <Select
                value={formData.industry}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, industry: value }));
                  validateField("industry", value);
                }}
                disabled={loadingState === "loading"}
              >
                <SelectTrigger
                  className={validationErrors.industry ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="산업 분야를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="전자">전자</SelectItem>
                  <SelectItem value="자동차">자동차</SelectItem>
                  <SelectItem value="화학">화학</SelectItem>
                  <SelectItem value="철강">철강</SelectItem>
                  <SelectItem value="섬유">섬유</SelectItem>
                  <SelectItem value="식품">식품</SelectItem>
                  <SelectItem value="의료">의료</SelectItem>
                  <SelectItem value="금융">금융</SelectItem>
                  <SelectItem value="통신">통신</SelectItem>
                  <SelectItem value="소프트웨어">소프트웨어</SelectItem>
                  <SelectItem value="반도체">반도체</SelectItem>
                  <SelectItem value="바이오">바이오</SelectItem>
                  <SelectItem value="기타">기타</SelectItem>
                </SelectContent>
              </Select>
              {validationErrors.industry && (
                <p className="text-sm text-red-600">
                  {validationErrors.industry}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="establishedYear">설립년도 *</Label>
              <Input
                id="establishedYear"
                type="number"
                min="1800"
                max={new Date().getFullYear()}
                value={formData.establishedYear}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    establishedYear: e.target.value
                  }));
                  validateField("establishedYear", e.target.value);
                }}
                placeholder="예: 1995"
                disabled={loadingState === "loading"}
                className={
                  validationErrors.establishedYear ? "border-red-500" : ""
                }
              />
              {validationErrors.establishedYear && (
                <p className="text-sm text-red-600">
                  {validationErrors.establishedYear}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="employeeCount">직원 수 *</Label>
              <Input
                id="employeeCount"
                type="number"
                min="1"
                max="10000000"
                value={formData.employeeCount}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    employeeCount: e.target.value
                  }));
                  validateField("employeeCount", e.target.value);
                }}
                placeholder="예: 1000"
                disabled={loadingState === "loading"}
                className={
                  validationErrors.employeeCount ? "border-red-500" : ""
                }
              />
              {validationErrors.employeeCount && (
                <p className="text-sm text-red-600">
                  {validationErrors.employeeCount}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="revenue">연매출 (억원) *</Label>
              <Input
                id="revenue"
                type="number"
                min="0"
                max="1000000"
                step="0.1"
                value={formData.revenue}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, revenue: e.target.value }));
                  validateField("revenue", e.target.value);
                }}
                placeholder="예: 1000"
                disabled={loadingState === "loading"}
                className={validationErrors.revenue ? "border-red-500" : ""}
              />
              {validationErrors.revenue && (
                <p className="text-sm text-red-600">
                  {validationErrors.revenue}
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

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
                !formData.name.trim() ||
                !formData.country ||
                !formData.businessType ||
                !formData.industry ||
                !formData.establishedYear ||
                !formData.employeeCount ||
                !formData.revenue
              }
            >
              {loadingState === "loading" ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  등록 중...
                </>
              ) : (
                "등록하기"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
