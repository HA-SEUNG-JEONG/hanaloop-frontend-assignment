"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Eye, Download, Edit } from "lucide-react";
import { Post, Company } from "@/app/types";
import { ReportModal } from "./ReportModal";
import { ReportPreviewModal } from "./ReportPreviewModal";
import {
  downloadReportAsPDF,
  downloadReportAsText
} from "@/lib/helpers/reportUtils";
import { deletePost } from "@/lib/api";
import { Input } from "@/components/ui/input";
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
import { Search, Trash2 } from "lucide-react";

interface ReportsListProps {
  posts: Post[];
  companies: Company[];
  onRefresh?: () => void;
}

export function ReportsList({ posts, companies, onRefresh }: ReportsListProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Post | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);

  const handleViewReport = (post: Post) => {
    const company = companies.find((c) => c.id === post.resourceId);
    setSelectedReport(post);
    setSelectedCompany(company || null);
    setIsPreviewModalOpen(true);
  };

  const handleDownloadPDF = (post: Post) => {
    const company = companies.find((c) => c.id === post.resourceId);
    if (company) {
      downloadReportAsPDF(post, company);
    }
  };

  const handleDownloadText = (post: Post) => {
    const company = companies.find((c) => c.id === post.resourceId);
    if (company) {
      downloadReportAsText(post, company);
    }
  };

  const handleEditReport = (post: Post) => {
    setSelectedReport(post);
    setIsCreateModalOpen(true);
  };

  const handleCreateSuccess = () => {
    setIsCreateModalOpen(false);
    setSelectedReport(null);
    onRefresh?.();
  };

  const handlePreviewClose = () => {
    setIsPreviewModalOpen(false);
    setSelectedReport(null);
    setSelectedCompany(null);
  };

  // 검색 기능 (클라이언트 사이드 + 디바운싱)
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    // 이전 타이머 클리어
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    if (query.trim() === "") {
      setFilteredPosts(posts);
      return;
    }

    // 300ms 디바운싱
    const timeout = setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      const searchResults = posts.filter((post) =>
        post.title.toLowerCase().includes(lowerQuery)
      );

      setFilteredPosts(searchResults);
    }, 300);

    setSearchTimeout(timeout);
  };

  // 보고서 삭제 확인
  const handleDeleteClick = (post: Post) => {
    setPostToDelete(post);
    setIsDeleteDialogOpen(true);
  };

  // 보고서 삭제 실행
  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;

    try {
      await deletePost(postToDelete.id);

      setIsDeleteDialogOpen(false);
      setPostToDelete(null);

      onRefresh?.();
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

  // posts가 변경될 때 filteredPosts 업데이트
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPosts(posts);
    } else {
      // 검색어가 있을 때도 새로운 posts에 대해 검색 실행
      const lowerQuery = searchQuery.toLowerCase();
      const searchResults = posts.filter((post) =>
        post.title.toLowerCase().includes(lowerQuery)
      );
      setFilteredPosts(searchResults);
    }
  }, [posts, searchQuery]);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  if (posts.length === 0) {
    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>제출된 보고서</CardTitle>
            <CardDescription>기업에서 제출한 지속가능성 보고서</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                아직 제출된 보고서가 없습니다.
              </p>
              <Button onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />첫 번째 보고서 작성하기
              </Button>
            </div>
          </CardContent>
        </Card>

        <ReportModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={handleCreateSuccess}
          companies={companies}
        />
      </>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>제출된 보고서</CardTitle>
              <CardDescription>
                기업에서 제출한 지속가능성 보고서
              </CardDescription>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />새 보고서 작성
            </Button>
          </div>

          {/* 검색 기능 */}
          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="보고서 제목으로 검색..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPosts.length === 0 && searchQuery.trim() !== "" ? (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>검색 결과가 없습니다.</p>
                <p className="text-sm">다른 검색어를 시도해보세요.</p>
              </div>
            ) : (
              filteredPosts.map((post) => {
                const company = companies.find((c) => c.id === post.resourceId);
                return (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{post.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {company?.name} •{" "}
                          {new Date(post.dateTime).toLocaleDateString("ko-KR")}
                        </p>
                        <p className="text-sm mt-1 line-clamp-2">
                          {post.content}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewReport(post)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        보기
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditReport(post)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        편집
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadPDF(post)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadText(post)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        TXT
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteClick(post)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        삭제
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* 보고서 작성/편집 모달 */}
      <ReportModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setSelectedReport(null);
        }}
        onSuccess={handleCreateSuccess}
        report={selectedReport}
        companies={companies}
      />

      {/* 보고서 미리보기 모달 */}
      <ReportPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={handlePreviewClose}
        report={selectedReport}
        company={selectedCompany}
        onEdit={() => {
          setIsPreviewModalOpen(false);
          handleEditReport(selectedReport!);
        }}
      />

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
              <strong>기업:</strong>{" "}
              {companies.find((c) => c.id === postToDelete?.resourceId)?.name}
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
    </>
  );
}
