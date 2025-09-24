import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Post, Company } from "../types";

interface RecentReportsProps {
  posts: Post[];
  companies: Company[];
}

export function RecentReports({ posts, companies }: RecentReportsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>최근 보고서</CardTitle>
        <CardDescription>
          기업에서 제출한 최신 지속가능성 보고서
        </CardDescription>
      </CardHeader>
      <CardContent>
        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => {
              const company = companies.find((c) => c.id === post.resourceId);
              return (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h4 className="font-medium">{post.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {company?.name} • {post.dateTime}
                    </p>
                    <p className="text-sm mt-1">{post.content}</p>
                  </div>
                  <Link href="/reports">
                    <Button variant="outline" size="sm">
                      자세히 보기
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              아직 제출된 보고서가 없습니다.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
