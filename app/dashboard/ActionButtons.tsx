import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, FileText } from "lucide-react";

export function ActionButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link href="/analytics">
        <Button size="lg" className="w-full sm:w-auto">
          <BarChart3 className="mr-2 h-4 w-4" />
          상세 분석 보기
        </Button>
      </Link>
      <Link href="/users">
        <Button variant="outline" size="lg" className="w-full sm:w-auto">
          <Users className="mr-2 h-4 w-4" />
          기업 관리
        </Button>
      </Link>
      <Link href="/reports">
        <Button variant="outline" size="lg" className="w-full sm:w-auto">
          <FileText className="mr-2 h-4 w-4" />
          보고서 작성
        </Button>
      </Link>
    </div>
  );
}
