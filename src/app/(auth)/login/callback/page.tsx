"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleKakaoCallback } from "@/features/auth/hooks/use-kakao-login";
import { useAuthStore } from "@/shared/store/auth-store";

export default function KakaoCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setUser = useAuthStore((s) => s.setUser);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      setErrorMessage("인증 코드를 받지 못했습니다.");
      return;
    }

    handleKakaoCallback(code)
      .then((result) => {
        setUser({ id: result.data.memberId, nickname: "", email: "" });
        router.replace("/lectures");
      })
      .catch(() => {
        setErrorMessage("로그인에 실패했습니다. 다시 시도해주세요.");
      });
  }, [searchParams, router, setUser]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      {errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <p>로그인 처리 중...</p>
      )}
    </main>
  );
}
