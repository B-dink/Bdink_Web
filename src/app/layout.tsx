import type { Metadata } from "next";
import { QueryProvider } from "@/shared/lib/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bdink 온라인 강의",
  description: "트레이너와 함께하는 온라인 강의",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
