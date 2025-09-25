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

// Zod 스키마 정의
const companySchema = z.object({
  name: z
    .string()
    .min(1, "회사명을 입력해주세요")
    .max(100, "회사명은 100자 이하로 입력해주세요"),
  country: z.string().min(1, "국가를 선택해주세요"),
  businessType: z.string().min(1, "사업 유형을 선택해주세요"),
  industry: z.string().min(1, "산업 분야를 선택해주세요"),
  establishedYear: z
    .string()
    .min(1, "설립년도를 입력해주세요")
    .refine((val) => {
      const year = parseInt(val);
      return year >= 1800 && year <= new Date().getFullYear();
    }, "올바른 설립년도를 입력해주세요"),
  employeeCount: z
    .string()
    .min(1, "직원 수를 입력해주세요")
    .refine((val) => {
      const count = parseInt(val);
      return count >= 1 && count <= 10000000;
    }, "직원 수는 1명 이상 10,000,000명 이하로 입력해주세요"),
  revenue: z
    .string()
    .min(1, "연매출을 입력해주세요")
    .refine((val) => {
      const revenue = parseFloat(val);
      return revenue >= 0 && revenue <= 1000000;
    }, "연매출은 0억원 이상 1,000,000억원 이하로 입력해주세요")
});

type CompanyFormData = z.infer<typeof companySchema>;

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
  const { loadingState, error, setLoadingState, setError } =
    useLoadingState("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      country: "",
      businessType: "",
      industry: "",
      establishedYear: "",
      employeeCount: "",
      revenue: ""
    }
  });

  const watchedValues = watch();

  // 폼 초기화
  useEffect(() => {
    if (isOpen) {
      reset();
      setError(null);
    }
  }, [isOpen, reset, setError]);

  // 폼 제출 핸들러
  const onSubmit = async (data: CompanyFormData) => {
    setLoadingState("loading");
    setError(null);

    try {
      await createCompany({
        name: data.name.trim(),
        country: data.country,
        businessType: data.businessType,
        industry: data.industry,
        establishedYear: parseInt(data.establishedYear),
        employeeCount: parseInt(data.employeeCount),
        revenue: parseFloat(data.revenue),
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">회사명 *</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="회사명을 입력하세요"
                disabled={loadingState === "loading"}
                className={errors.name ? "border-red-500" : ""}
                maxLength={100}
              />
              <div className="flex justify-between items-center">
                {errors.name ? (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {watchedValues.name?.length || 0}/100자
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">국가 *</Label>
              <Select
                value={watchedValues.country}
                onValueChange={(value) => setValue("country", value)}
                disabled={loadingState === "loading"}
              >
                <SelectTrigger
                  className={errors.country ? "border-red-500" : ""}
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
              {errors.country && (
                <p className="text-sm text-red-600">{errors.country.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessType">사업 유형 *</Label>
              <Select
                value={watchedValues.businessType}
                onValueChange={(value) => setValue("businessType", value)}
                disabled={loadingState === "loading"}
              >
                <SelectTrigger
                  className={errors.businessType ? "border-red-500" : ""}
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
              {errors.businessType && (
                <p className="text-sm text-red-600">
                  {errors.businessType.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">산업 분야 *</Label>
              <Select
                value={watchedValues.industry}
                onValueChange={(value) => setValue("industry", value)}
                disabled={loadingState === "loading"}
              >
                <SelectTrigger
                  className={errors.industry ? "border-red-500" : ""}
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
              {errors.industry && (
                <p className="text-sm text-red-600">
                  {errors.industry.message}
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
                {...register("establishedYear")}
                placeholder="예: 1995"
                disabled={loadingState === "loading"}
                className={errors.establishedYear ? "border-red-500" : ""}
              />
              {errors.establishedYear && (
                <p className="text-sm text-red-600">
                  {errors.establishedYear.message}
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
                {...register("employeeCount")}
                placeholder="예: 1000"
                disabled={loadingState === "loading"}
                className={errors.employeeCount ? "border-red-500" : ""}
              />
              {errors.employeeCount && (
                <p className="text-sm text-red-600">
                  {errors.employeeCount.message}
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
                {...register("revenue")}
                placeholder="예: 1000"
                disabled={loadingState === "loading"}
                className={errors.revenue ? "border-red-500" : ""}
              />
              {errors.revenue && (
                <p className="text-sm text-red-600">{errors.revenue.message}</p>
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
              disabled={loadingState === "loading" || !isValid}
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
