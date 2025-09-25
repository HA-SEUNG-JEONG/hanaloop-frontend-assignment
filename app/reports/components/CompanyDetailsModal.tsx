"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Company, Post } from "@/app/types";
import { CompanyDetails } from "./CompanyDetails";
import { fetchPostsByCompany, deletePost } from "@/lib/api";
import { useLoadingState } from "@/lib/hooks/useLoadingState";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { FileText, Calendar, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CompanyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company | null;
  onRefresh?: () => void;
}

export function CompanyDetailsModal({
  isOpen,
  onClose,
  company,
  onRefresh
}: CompanyDetailsModalProps) {
  const [companyPosts, setCompanyPosts] = useState<Post[]>([]);
  const { loadingState, setLoadingState, setError } = useLoadingState("idle");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);

  // 기업별 보고서 로드
  useEffect(() => {
    if (company && isOpen) {
      const loadCompanyPosts = async () => {
        setLoadingState("loading");
        try {
          const posts = await fetchPostsByCompany(company.id);
          setCompanyPosts(posts);
          setLoadingState("success");
        } catch (error) {
          console.error("기업별 보고서 로드 실패:", error);
          setError("보고서를 불러오는 중 오류가 발생했습니다.");
          setLoadingState("error");
        }
      };
      loadCompanyPosts();
    }
  }, [company, isOpen, setLoadingState, setError]);

  // 보고서 삭제 확인
  const handleDeleteClick = (post: Post) => {
    setPostToDelete(post);
    setIsDeleteDialogOpen(true);
  };

  // 보고서 삭제 실행
  const handleDeleteConfirm = async () => {
    if (!postToDelete || !company) return;

    try {
      await deletePost(postToDelete.id);
      // 보고서 목록 새로고침
      const posts = await fetchPostsByCompany(company.id);
      setCompanyPosts(posts);
      onRefresh?.();
      setIsDeleteDialogOpen(false);
      setPostToDelete(null);
    } catch (error) {
      console.error("보고서 삭제 실패:", error);
      alert("보고서 삭제 중 오류가 발생했습니다.");
    }
  };

  // 삭제 취소
  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  if (!company) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>기업 상세 정보</DialogTitle>
          <DialogDescription>
            {company.name}의 상세 정보, 배출량 현황 및 제출된 보고서
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* 기업 상세 정보 */}
          <CompanyDetails company={company} />

          {/* 기업별 보고서 목록 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                제출된 보고서
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingState === "loading" ? (
                <div className="flex items-center justify-center py-8">
                  <LoadingSpinner className="mr-2 h-4 w-4" />
                  <span>보고서를 불러오는 중...</span>
                </div>
              ) : loadingState === "error" ? (
                <div className="text-center py-8 text-muted-foreground">
                  보고서를 불러올 수 없습니다.
                </div>
              ) : companyPosts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>아직 제출된 보고서가 없습니다.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {companyPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{post.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.dateTime).toLocaleDateString(
                              "ko-KR"
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {post.content.length > 100
                            ? "긴 보고서"
                            : "짧은 보고서"}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(post)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>

      {/* 삭제 확인 모달 */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>보고서 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              정말로 이 보고서를 삭제하시겠습니까?
              <br />
              <br />
              <strong>제목:</strong> {postToDelete?.title}
              <br />
              <strong>기업:</strong> {company?.name}
              <br />
              <br />이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeleteCancel}>
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}
