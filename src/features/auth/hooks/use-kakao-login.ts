"use client";

import { authApi } from "../api/auth-api";
import { tokenStorage } from "@/shared/lib/token-storage";

// 로그인 버튼 클릭 시 호출 - 카카오 인증 페이지로 리다이렉트됨
export function redirectToKakaoLogin() {
  window.Kakao.Auth.authorize({
    redirectUri: `${window.location.origin}/login/callback`,
  });
}

// 카카오 인증 완료 후 돌아온 콜백 페이지에서 호출
// 쿼리스트링의 code를 우리 백엔드(/api/v1/oauth2/web)로 전달해서 최종 로그인 처리
export async function handleKakaoCallback(code: string) {
  const redirectUri = `${window.location.origin}/login/callback`;
  const result = await authApi.socialLogin(code, "KAKAO", redirectUri);
  tokenStorage.setTokens(result.data.tokenDto.accessToken, result.data.tokenDto.refreshToken);
  return result;
}