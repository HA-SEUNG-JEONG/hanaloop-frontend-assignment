import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavigationProvider from "./dashboard/components/NavigationProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const metadata: Metadata = {
  title: "HanaLoop 배출량 대시보드",
  description: "전 세계 국가별 및 기업별 CO₂ 배출량 모니터링 대시보드"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavigationProvider>{children}</NavigationProvider>
      </body>
    </html>
  );
}
