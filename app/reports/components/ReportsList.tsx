import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import { Post, Company } from "@/app/types";

interface ReportsListProps {
  posts: Post[];
  companies: Company[];
}

export function ReportsList({ posts, companies }: ReportsListProps) {
  if (posts.length === 0) {
    return (
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
            <Button>
              <Plus className="h-4 w-4 mr-2" />첫 번째 보고서 작성하기
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>제출된 보고서</CardTitle>
        <CardDescription>기업에서 제출한 지속가능성 보고서</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {posts.map((post) => {
            const company = companies.find((c) => c.id === post.resourceId);
            return (
              <div
                key={post.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{post.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {company?.name} • {post.dateTime}
                    </p>
                    <p className="text-sm mt-1">{post.content}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    보기
                  </Button>
                  <Button variant="outline" size="sm">
                    다운로드
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
