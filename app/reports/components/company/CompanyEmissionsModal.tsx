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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Company, GhgEmission } from "@/app/types";
import { useLoadingState } from "@/lib/hooks/useLoadingState";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Plus, Trash2, Calendar } from "lucide-react";

interface CompanyEmissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  company: Company | null;
}

export function CompanyEmissionsModal({
  isOpen,
  onClose,
  onSuccess,
  company
}: CompanyEmissionsModalProps) {
  const [emissions, setEmissions] = useState<GhgEmission[]>([]);
  const [newEmission, setNewEmission] = useState({
    yearMonth: "",
    source: "",
    emissions: ""
  });

  const { loadingState, error, setLoadingState, setError } =
    useLoadingState("idle");

  // 폼 초기화
  useEffect(() => {
    if (company) {
      setEmissions([...company.emissions]);
    } else {
      setEmissions([]);
    }
    setNewEmission({
      yearMonth: "",
      source: "",
      emissions: ""
    });
  }, [company, isOpen]);

  const handleAddEmission = () => {
    if (!newEmission.yearMonth || !newEmission.emissions) {
      setError("년월과 배출량을 입력해주세요.");
      return;
    }

    const emission: GhgEmission = {
      yearMonth: newEmission.yearMonth,
      source: newEmission.source || undefined,
      emissions: parseFloat(newEmission.emissions)
    };

    setEmissions((prev) =>
      [...prev, emission].sort((a, b) => a.yearMonth.localeCompare(b.yearMonth))
    );

    setNewEmission({
      yearMonth: "",
      source: "",
      emissions: ""
    });
    setError(null);
  };

  const handleRemoveEmission = (index: number) => {
    setEmissions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (emissions.length === 0) {
      setError("최소 하나의 배출량 데이터가 필요합니다.");
      return;
    }

    setLoadingState("loading");
    setError(null);

    try {
      // TODO: 실제 API 호출로 배출량 데이터 업데이트
      // await updateCompanyEmissions(company.id, emissions);

      // 시뮬레이션을 위한 지연
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setLoadingState("success");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("배출량 데이터 저장 실패:", error);
      setError(
        error instanceof Error
          ? error.message
          : "배출량 데이터 저장 중 오류가 발생했습니다."
      );
      setLoadingState("error");
    }
  };

  const handleClose = () => {
    if (loadingState !== "loading") {
      onClose();
    }
  };

  const getCurrentYearMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  };

  if (!company) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>배출량 데이터 관리</DialogTitle>
          <DialogDescription>
            {company.name}의 배출량 데이터를 관리합니다.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 기업 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{company.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    국가
                  </p>
                  <Badge variant="outline">{company.country}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    산업분야
                  </p>
                  <Badge variant="secondary">{company.industry}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    사업유형
                  </p>
                  <p className="font-medium">{company.businessType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    설립년도
                  </p>
                  <p className="font-medium">{company.establishedYear}년</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 새 배출량 추가 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Plus className="h-5 w-5" />새 배출량 데이터 추가
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="yearMonth">년월</Label>
                  <Input
                    id="yearMonth"
                    type="month"
                    value={newEmission.yearMonth}
                    onChange={(e) =>
                      setNewEmission((prev) => ({
                        ...prev,
                        yearMonth: e.target.value
                      }))
                    }
                    placeholder="2024-01"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="source">배출원 (선택사항)</Label>
                  <Input
                    id="source"
                    value={newEmission.source}
                    onChange={(e) =>
                      setNewEmission((prev) => ({
                        ...prev,
                        source: e.target.value
                      }))
                    }
                    placeholder="예: 가솔린, 디젤, LPG"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emissions">배출량 (톤)</Label>
                  <Input
                    id="emissions"
                    type="number"
                    step="0.01"
                    value={newEmission.emissions}
                    onChange={(e) =>
                      setNewEmission((prev) => ({
                        ...prev,
                        emissions: e.target.value
                      }))
                    }
                    placeholder="0.00"
                  />
                </div>
              </div>
              <Button
                onClick={handleAddEmission}
                className="mt-4"
                disabled={!newEmission.yearMonth || !newEmission.emissions}
              >
                <Plus className="h-4 w-4 mr-2" />
                추가하기
              </Button>
            </CardContent>
          </Card>

          {/* 기존 배출량 데이터 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                배출량 데이터 목록
              </CardTitle>
            </CardHeader>
            <CardContent>
              {emissions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  등록된 배출량 데이터가 없습니다.
                </div>
              ) : (
                <div className="space-y-3">
                  {emissions.map((emission, index) => (
                    <div
                      key={`${emission.yearMonth}-${index}`}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-medium">{emission.yearMonth}</p>
                          {emission.source && (
                            <p className="text-sm text-muted-foreground">
                              {emission.source}
                            </p>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-lg">
                            {emission.emissions.toFixed(2)} 톤
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveEmission(index)}
                        disabled={loadingState === "loading"}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* 에러 메시지 */}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}
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
            onClick={handleSave}
            disabled={loadingState === "loading" || emissions.length === 0}
          >
            {loadingState === "loading" && (
              <LoadingSpinner className="mr-2 h-4 w-4" />
            )}
            저장하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
