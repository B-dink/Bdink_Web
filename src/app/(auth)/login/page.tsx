"use client";

import { useKakaoSdk } from "@/features/auth/hooks/use-kakao-sdk";
import { redirectToKakaoLogin } from "@/features/auth/hooks/use-kakao-login";

export default function LoginPage() {
  const isKakaoReady = useKakaoSdk();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-2xl font-bold">Bdink 온라인 강의</h1>
      <p className="text-gray-500">로그인하고 강의를 둘러보세요</p>

      <button
        onClick={redirectToKakaoLogin}
        disabled={!isKakaoReady}
        className="flex items-center gap-2 rounded-lg bg-[#FEE500] px-6 py-3 font-medium text-black disabled:opacity-50"
      >
        카카오로 시작하기
      </button>

      {/* 애플 로그인은 별도 Apple JS SDK + Service ID 설정 완료 후 추가 예정 */}
    </main>
  );
}
