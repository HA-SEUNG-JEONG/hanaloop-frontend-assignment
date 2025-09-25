"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Post, Company } from "@/app/types";
import { fetchRecentPosts } from "@/lib/api";
import { useLoadingState } from "@/lib/hooks/useLoadingState";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { FileText, Calendar, ExternalLink } from "lucide-react";

interface RecentReportsWidgetProps {
  companies: Company[];
}

export function RecentReportsWidget({ companies }: RecentReportsWidgetProps) {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const { loadingState, setLoadingState, setError } =
    useLoadingState("loading");

  useEffect(() => {
    const loadRecentPosts = async () => {
      setLoadingState("loading");
      try {
        const posts = await fetchRecentPosts(5);
        setRecentPosts(posts);
        setLoadingState("success");
      } catch (error) {
        console.error("최근 보고서 로드 실패:", error);
        setError("최근 보고서를 불러오는 중 오류가 발생했습니다.");
        setLoadingState("error");
      }
    };

    loadRecentPosts();
  }, [setLoadingState, setError]);

  const getCompanyName = (companyId: string) => {
    const company = companies.find((c) => c.id === companyId);
    return company?.name || "알 수 없는 기업";
  };

  const getCompanyCountry = (companyId: string) => {
    const company = companies.find((c) => c.id === companyId);
    return company?.country || "";
  };

  if (loadingState === "loading") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>최근 보고서</CardTitle>
          <CardDescription>최근에 제출된 보고서 목록</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner className="mr-2 h-4 w-4" />
            <span>최근 보고서를 불러오는 중...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (loadingState === "error") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>최근 보고서</CardTitle>
          <CardDescription>최근에 제출된 보고서 목록</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>최근 보고서를 불러올 수 없습니다.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          최근 보고서
        </CardTitle>
        <CardDescription>최근에 제출된 보고서 목록</CardDescription>
      </CardHeader>
      <CardContent>
        {recentPosts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>아직 제출된 보고서가 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{post.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{getCompanyName(post.resourceId)}</span>
                      {getCompanyCountry(post.resourceId) && (
                        <>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs">
                            {getCompanyCountry(post.resourceId)}
                          </Badge>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.dateTime).toLocaleDateString("ko-KR")}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
