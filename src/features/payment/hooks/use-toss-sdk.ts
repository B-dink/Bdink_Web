"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    TossPayments: any;
  }
}

export function useTossSdk() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (window.TossPayments) {
      setIsReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js.tosspayments.com/v2/standard";
    script.onload = () => setIsReady(true);
    document.head.appendChild(script);
  }, []);

  return isReady;
}
