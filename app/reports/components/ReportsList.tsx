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
  const [isSearching, setIsSearching] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

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
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // 300ms 디바운싱
    const timeout = setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      const searchResults = posts.filter((post) =>
        post.title.toLowerCase().includes(lowerQuery)
      );

      setFilteredPosts(searchResults);
      setIsSearching(false);
    }, 300);

    setSearchTimeout(timeout);
  };

  // 보고서 삭제
  const handleDeleteReport = async (postId: string) => {
    if (!confirm("정말로 이 보고서를 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deletePost(postId);
      onRefresh?.();
    } catch (error) {
      console.error("보고서 삭제 실패:", error);
      alert("보고서 삭제 중 오류가 발생했습니다.");
    }
  };

  // posts가 변경될 때 filteredPosts 업데이트
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPosts(posts);
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg sm:text-xl">
                  제출된 보고서
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  기업에서 제출한 지속가능성 보고서
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 sm:py-12">
              <FileText className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                아직 제출된 보고서가 없습니다.
              </p>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                <span className="text-sm sm:text-base">
                  첫 번째 보고서 작성하기
                </span>
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg sm:text-xl">
                제출된 보고서
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                기업에서 제출한 지속가능성 보고서
              </CardDescription>
            </div>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full sm:w-auto flex-shrink-0"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span className="text-sm sm:text-base">새 보고서 작성</span>
            </Button>
          </div>

          {/* 검색 기능 */}
          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="보고서 제목이나 내용으로 검색..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 w-full"
                disabled={isSearching}
              />
            </div>
            {isSearching && (
              <p className="text-sm text-muted-foreground mt-2">검색 중...</p>
            )}
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
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors gap-4"
                  >
                    <div className="flex items-start sm:items-center space-x-4 flex-1 min-w-0">
                      <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm sm:text-base truncate">
                          {post.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {company?.name} •{" "}
                          {new Date(post.dateTime).toLocaleDateString("ko-KR")}
                        </p>
                        <p className="text-xs sm:text-sm mt-1 line-clamp-2 text-muted-foreground">
                          {post.content}
                        </p>
                      </div>
                    </div>

                    {/* 데스크톱: 가로 배치, 모바일: 세로 배치 */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 w-full sm:w-auto">
                      {/* 주요 액션 버튼들 */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewReport(post)}
                          className="flex-1 sm:flex-none text-xs"
                        >
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          <span className="hidden xs:inline">보기</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditReport(post)}
                          className="flex-1 sm:flex-none text-xs"
                        >
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          <span className="hidden xs:inline">편집</span>
                        </Button>
                      </div>

                      {/* 다운로드 및 삭제 버튼들 */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadPDF(post)}
                          className="flex-1 sm:flex-none text-xs"
                        >
                          <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          PDF
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadText(post)}
                          className="flex-1 sm:flex-none text-xs"
                        >
                          <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          TXT
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteReport(post.id)}
                          className="flex-1 sm:flex-none text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          <span className="hidden xs:inline">삭제</span>
                        </Button>
                      </div>
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
    </>
  );
}
