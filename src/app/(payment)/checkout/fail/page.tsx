"use client";

import Link from "next/link";

export default function CheckoutFailPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-base-bg px-4 text-center text-text-primary">
      <p className="text-red-400">결제가 취소되었거나 실패했습니다.</p>
      <Link href="/lectures" className="rounded-pill bg-brand px-6 py-2 font-bold text-black">
        강의 목록으로
      </Link>
    </main>
  );
}
