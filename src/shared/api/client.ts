import axios from "axios";
import { tokenStorage } from "@/shared/lib/token-storage";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// 요청마다 accessToken을 Authorization 헤더에 자동으로 붙임 (iOS Moya의 hasAccessToken 헤더 방식과 동일)
apiClient.interceptors.request.use((config) => {
  const accessToken = tokenStorage.getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let pendingRequests: Array<() => void> = [];

// 401 응답 시 refreshToken으로 재발급 시도 후 원래 요청 재시도
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = tokenStorage.getRefreshToken();
      if (!refreshToken) {
        tokenStorage.clearTokens();
        return Promise.reject(error);
      }

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/oauth2/token`,
            { refreshToken }
          );
          tokenStorage.setTokens(data.data.tokenDto.accessToken, data.data.tokenDto.refreshToken);
          pendingRequests.forEach((cb) => cb());
          pendingRequests = [];
        } catch (refreshError) {
          tokenStorage.clearTokens();
          pendingRequests = [];
          isRefreshing = false;
          return Promise.reject(refreshError);
        }
        isRefreshing = false;
      }

      return new Promise((resolve) => {
        pendingRequests.push(() => resolve(apiClient(originalRequest)));
      });
    }

    return Promise.reject(error);
  }
);
