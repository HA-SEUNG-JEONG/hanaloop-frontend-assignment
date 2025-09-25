"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Post, Company } from "@/app/types";
import {
  generateReportPreview,
  downloadReportAsPDF,
  downloadReportAsText
} from "@/lib/helpers/reportUtils";
import { FileText, Download, Eye } from "lucide-react";

interface ReportPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: Post | null;
  company: Company | null;
  onEdit?: () => void;
}

export function ReportPreviewModal({
  isOpen,
  onClose,
  report,
  company,
  onEdit
}: ReportPreviewModalProps) {
  if (!report || !company) return null;

  const preview = generateReportPreview(report, company);

  const handleDownloadPDF = () => {
    downloadReportAsPDF(report, company);
  };

  const handleDownloadText = () => {
    downloadReportAsText(report, company);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            보고서 미리보기
          </DialogTitle>
          <DialogDescription>
            제출된 보고서의 상세 내용을 확인할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 보고서 헤더 정보 */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{preview.title}</CardTitle>
                  <p className="text-muted-foreground mt-1">
                    지속가능성 보고서
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadPDF}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadText}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    TXT
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    기업명
                  </p>
                  <p className="font-semibold">{preview.company}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    국가
                  </p>
                  <Badge variant="outline">{preview.country}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    산업분야
                  </p>
                  <Badge variant="secondary">{preview.industry}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    제출일
                  </p>
                  <p className="font-medium">{preview.submitDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 보고서 내용 */}
          <Card>
            <CardHeader>
              <CardTitle>보고서 내용</CardTitle>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>단어 수: {preview.wordCount}개</span>
                <span>글자 수: {preview.characterCount}자</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {preview.content}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 액션 버튼 */}
          <div className="flex justify-end gap-2">
            {onEdit && (
              <Button variant="outline" onClick={onEdit}>
                <Eye className="h-4 w-4 mr-2" />
                편집하기
              </Button>
            )}
            <Button onClick={onClose}>닫기</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
