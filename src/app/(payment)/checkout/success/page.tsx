"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { paymentApi } from "@/features/payment/api/payment-api";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"processing" | "error">("processing");
  const [errorMessage, setErrorMessage] = useState("");
  const hasRequestedRef = useRef(false); // React StrictMode 등으로 인한 중복 호출 방지

  useEffect(() => {
    if (hasRequestedRef.current) return;
    hasRequestedRef.current = true;

    const paymentKey = searchParams.get("paymentKey");
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");
    const classRoomId = searchParams.get("classRoomId");

    if (!paymentKey || !orderId || !amount || !classRoomId) {
      setStatus("error");
      setErrorMessage("결제 정보가 올바르지 않습니다.");
      return;
    }

    (async () => {
      try {
        await paymentApi.confirmPayment({
          paymentKey,
          orderId,
          amount: Number(amount),
        });

        await paymentApi.startSugang(Number(classRoomId));

        router.replace(`/lectures/${classRoomId}`);
      } catch (e) {
        setStatus("error");
        setErrorMessage("결제 처리 중 문제가 발생했습니다. 고객센터에 문의해주세요.");
      }
    })();
  }, [searchParams, router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-base-bg px-4 text-center text-text-primary">
      {status === "processing" ? (
        <p>결제를 확인하고 있어요...</p>
      ) : (
        <div>
          <p className="text-red-400">{errorMessage}</p>
        </div>
      )}
    </main>
  );
}
