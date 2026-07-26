"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    Kakao: any;
  }
}

// 카카오 개발자센터 > 플랫폼 키 > JavaScript 키
const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY!;

export function useKakaoSdk() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JS_KEY);
      }
      setIsReady(true);
      return;
    }

    const script = document.createElement("script");
    // 최신 버전/무결성 해시는 카카오 개발자문서(SDK 다운로드 페이지)에서 최신 값으로 교체 권장
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";
    script.onload = () => {
      window.Kakao.init(KAKAO_JS_KEY);
      setIsReady(true);
    };
    document.head.appendChild(script);
  }, []);

  return isReady;
}
