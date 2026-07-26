import { apiClient } from "@/shared/api/client";
import type { ConfirmPaymentRequest, ConfirmPaymentResponse, StartSugangResponse } from "../types/payment";

interface BaseResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export const paymentApi = {
  // POST /api/v1/payments/confirm - 토스 결제 승인 검증
  confirmPayment: async (body: ConfirmPaymentRequest): Promise<ConfirmPaymentResponse> => {
    const { data } = await apiClient.post<BaseResponse<ConfirmPaymentResponse>>(
      "/api/v1/payments/confirm",
      body
    );
    return data.data;
  },

  // POST /api/v1/sugang?classRoomId=xxx - 수강 시작 (결제 승인 이후 반드시 호출)
  startSugang: async (classRoomId: number): Promise<StartSugangResponse> => {
    const { data } = await apiClient.post<BaseResponse<StartSugangResponse>>("/api/v1/sugang", null, {
      params: { classRoomId },
    });
    return data.data;
  },
};

// Android generateOrderId/generatePaymentKey 그대로 옮김
export function generateOrderId(): string {
  const uuid = crypto.randomUUID().replace(/-/g, "");
  return `Bd-${uuid.substring(0, 15)}`;
}

export function generatePaymentKey(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(
    now.getHours()
  )}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  const randomSuffix = Math.floor(Math.random() * 0xfffff).toString(16).slice(-5);
  return `bdink${timestamp}${randomSuffix}`;
}
