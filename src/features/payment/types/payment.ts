export interface ConfirmPaymentRequest {
  amount: number;
  orderId: string;
  paymentKey: string;
}

export interface ConfirmPaymentResponse {
  price: number;
  orderId: string;
  paymentKey: string;
}

export interface StartSugangResponse {
  // 실제 응답 필드 스웨거 확인 전까지 빈 형태로 둠 - 확인되면 채우기
  [key: string]: unknown;
}
