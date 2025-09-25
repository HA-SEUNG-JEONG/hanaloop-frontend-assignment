import { Post, Company } from "@/app/types";

/**
 * 보고서를 PDF 형태로 다운로드하는 함수
 */
export const downloadReportAsPDF = (post: Post, company: Company) => {
  const content = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${post.title}</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          margin: 40px;
          color: #333;
        }
        .header {
          border-bottom: 2px solid #2563eb;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .company-info {
          background-color: #f8fafc;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
        }
        .content {
          white-space: pre-wrap;
          font-size: 14px;
          line-height: 1.8;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          font-size: 12px;
          color: #6b7280;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${post.title}</h1>
        <p>지속가능성 보고서</p>
      </div>

      <div class="company-info">
        <h3>기업 정보</h3>
        <p><strong>기업명:</strong> ${company.name}</p>
        <p><strong>국가:</strong> ${company.country}</p>
        <p><strong>산업분야:</strong> ${company.industry}</p>
        <p><strong>사업유형:</strong> ${company.businessType}</p>
        <p><strong>제출일:</strong> ${new Date(
          post.dateTime
        ).toLocaleDateString("ko-KR")}</p>
      </div>

      <div class="content">
        ${post.content}
      </div>

      <div class="footer">
        <p>본 보고서는 HanaLoop 배출량 대시보드를 통해 생성되었습니다.</p>
        <p>생성일시: ${new Date().toLocaleString("ko-KR")}</p>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob([content], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${company.name}_${post.title}_${
    new Date().toISOString().split("T")[0]
  }.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * 보고서를 텍스트 파일로 다운로드하는 함수
 */
export const downloadReportAsText = (post: Post, company: Company) => {
  const content = `
${post.title}
지속가능성 보고서

기업 정보:
- 기업명: ${company.name}
- 국가: ${company.country}
- 산업분야: ${company.industry}
- 사업유형: ${company.businessType}
- 제출일: ${new Date(post.dateTime).toLocaleDateString("ko-KR")}

보고서 내용:
${post.content}

---
본 보고서는 HanaLoop 배출량 대시보드를 통해 생성되었습니다.
생성일시: ${new Date().toLocaleString("ko-KR")}
  `;

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${company.name}_${post.title}_${
    new Date().toISOString().split("T")[0]
  }.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * 보고서 미리보기 데이터 생성
 */
export const generateReportPreview = (post: Post, company: Company) => {
  return {
    title: post.title,
    company: company.name,
    country: company.country,
    industry: company.industry,
    businessType: company.businessType,
    submitDate: new Date(post.dateTime).toLocaleDateString("ko-KR"),
    content: post.content,
    wordCount: post.content.split(/\s+/).length,
    characterCount: post.content.length
  };
};
