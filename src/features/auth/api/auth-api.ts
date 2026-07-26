import { apiClient } from "@/shared/api/client";
import type { BaseResponseDTO, LoginResponseData, OAuthProvider } from "../types/auth";

export const authApi = {
  // 웹 전용 엔드포인트(/api/v1/oauth2/web) 사용 - code, provider, redirectUri를 넘김
  socialLogin: async (code: string, provider: OAuthProvider, redirectUri: string) => {
    const { data } = await apiClient.get<BaseResponseDTO<LoginResponseData>>("/api/v1/oauth2/web", {
      params: { code, provider, redirectUri },
    });
    return data;
  },

  refreshToken: async (refreshToken: string) => {
    const { data } = await apiClient.post<BaseResponseDTO<LoginResponseData>>(
      "/api/v1/oauth2/token",
      { refreshToken }
    );
    return data;
  },

  logout: async () => {
    await apiClient.post("/api/v1/oauth2/sign-out");
  },
};