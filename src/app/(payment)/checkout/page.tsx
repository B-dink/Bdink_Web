"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTossSdk } from "@/features/payment/hooks/use-toss-sdk";
import { generateOrderId, generatePaymentKey } from "@/features/payment/api/payment-api";
import { useAuthStore } from "@/shared/store/auth-store";

const TOSS_CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const classRoomId = searchParams.get("classRoomId");
  const price = Number(searchParams.get("price") ?? 0);
  const title = searchParams.get("title") ?? "강의 결제";

  const isSdkReady = useTossSdk();
  const user = useAuthStore((s) => s.user);
  const widgetsRef = useRef<any>(null);
  const [isRendering, setIsRendering] = useState(true);

  const orderIdRef = useRef(generateOrderId());
  const paymentKeyRef = useRef(generatePaymentKey());

  useEffect(() => {
    if (!isSdkReady || !classRoomId) return;

    async function setup() {
      const tossPayments = window.TossPayments(TOSS_CLIENT_KEY);
      // customerKey는 반드시 문자열이어야 함 - user.id가 숫자(number)로 저장되어 있어 String() 변환 필요
      const customerKey = user?.id ? String(user.id) : window.TossPayments.ANONYMOUS;
      const widgets = tossPayments.widgets({ customerKey });
      widgetsRef.current = widgets;

      await widgets.setAmount({ currency: "KRW", value: price });

      await Promise.all([
        widgets.renderPaymentMethods({ selector: "#payment-method", variantKey: "DEFAULT" }),
        widgets.renderAgreement({ selector: "#agreement", variantKey: "AGREEMENT" }),
      ]);

      setIsRendering(false);
    }

    setup();
  }, [isSdkReady, classRoomId, price, user]);

  const handlePayment = async () => {
    if (!widgetsRef.current || !classRoomId) return;

    const origin = window.location.origin;
    await widgetsRef.current.requestPayment({
      orderId: orderIdRef.current,
      orderName: title,
      successUrl: `${origin}/checkout/success?classRoomId=${classRoomId}`,
      failUrl: `${origin}/checkout/fail`,
    });
  };

  if (!classRoomId) {
    return <div className="p-8 text-center text-text-secondary">잘못된 결제 요청입니다.</div>;
  }

  return (
    <main className="min-h-screen bg-base-bg px-4 py-6 text-text-primary">
      <h1 className="mb-4 text-lg font-bold">{title}</h1>

      <div id="payment-method" />
      <div id="agreement" className="mt-4" />

      {isRendering && <p className="mt-4 text-center text-sm text-text-secondary">결제 UI 로딩 중...</p>}

      <button
        onClick={handlePayment}
        disabled={isRendering}
        className="mt-8 w-full rounded-pill bg-brand py-3 font-bold text-black disabled:opacity-40"
      >
        {price.toLocaleString()}원 결제하기
      </button>
    </main>
  );
}
