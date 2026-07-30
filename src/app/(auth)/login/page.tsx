"use client";

import { useState } from "react";
import { useKakaoSdk } from "@/features/auth/hooks/use-kakao-sdk";
import { redirectToKakaoLogin } from "@/features/auth/hooks/use-kakao-login";

const HERO_VIDEO = "https://s3.amazonaws.com/webflow-prod-assets/67e93961195a89e77c09e4cc/69ba337c7864a17ab486025c_0318.mp4";

const APP_STORE_URL = "https://apps.apple.com/kr/app/%EB%B2%84%EB%94%A9%ED%81%AC-ai%EC%9A%B4%EB%8F%99%EC%9D%BC%EC%A7%80-%EC%9A%B4%EB%8F%99%EA%B0%95%EC%9D%98-%ED%97%AC%EC%8A%A4-%EC%9A%B4%EB%8F%99%EA%B8%B0%EB%A1%9D/id6743431155";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=co.kr.bdink.app&pcampaignid=web_share";
const APPLE_BADGE = "https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/ko-kr?size=250x83";
const GOOGLE_BADGE = "https://play.google.com/intl/ko/badges/static/images/badges/ko_badge_web_generic.png";

const STATS = [
  { label: "누적 회원", value: "2,000명+" },
  { label: "누적 시청", value: "800시간+" },
  { label: "트레이너", value: "20명+" },
];

const LECTURES = [
  { title: "10년의 경험을 1시간으로", instructor: "박윤창", meta: "8강 · 1시간 12분", tone: "linear-gradient(140deg,#3A3A3A,#161616)" },
  { title: "보디빌딩 실전 보조제 선별", instructor: "사과코치", meta: "6강 · 54분", tone: "linear-gradient(140deg,#31431F,#151515)" },
  { title: "나만의 강점을 만드는 운동법", instructor: "엠마누엘", meta: "12강 · 2시간 4분", tone: "linear-gradient(140deg,#2C2C2C,#121212)" },
  { title: "2025년 상체 루틴 총정리", instructor: "신동준", meta: "10강 · 1시간 38분", tone: "linear-gradient(140deg,#3D4A2A,#161616)" },
  { title: "런칭 세미나: 버딩크 x 레드뉴트리션", instructor: "사과코치", meta: "4강 · 42분", tone: "linear-gradient(140deg,#333333,#131313)" },
  { title: "상체 부위에 따른 대외비 모음집", instructor: "좌용관", meta: "9강 · 1시간 27분", tone: "linear-gradient(140deg,#26331A,#141414)" },
];

function KakaoButton({ ready, onClick, size }: { ready: boolean; onClick: () => void; size: "lg" | "md" }) {
  const height = size === "lg" ? "h-[58px] text-[16px]" : "h-[52px] text-[15px]";
  return (
    <button onClick={onClick} disabled={!ready} className={"bd-kakao flex w-full items-center justify-center gap-2.5 rounded-[14px] font-bold transition disabled:cursor-not-allowed disabled:opacity-50 " + height}>
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3.5C6.75 3.5 2.5 6.83 2.5 10.94c0 2.65 1.77 4.98 4.44 6.29-.15.53-.94 3.24-.97 3.45 0 0-.02.16.09.23.1.06.23.01.23.01.3-.04 3.47-2.27 4.02-2.65.55.08 1.11.12 1.69.12 5.25 0 9.5-3.33 9.5-7.45S17.25 3.5 12 3.5z" fill="rgba(0,0,0,.88)" />
      </svg>
      카카오로 시작하기
    </button>
  );
}

export default function LoginPage() {
  const isKakaoReady = useKakaoSdk();
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <main className="bd-root min-h-screen text-white" style={{ background: "#212121" }}>
      <style>{`
        @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css");
        .bd-root { font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif; -webkit-font-smoothing: antialiased; }
        @keyframes bdUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        @keyframes bdSwipe { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes bdPop { from { opacity: 0; transform: translateY(12px) scale(.97); } to { opacity: 1; transform: none; } }
        @keyframes bdFade { from { opacity: 0; } to { opacity: 1; } }
        .bd-up { opacity: 0; animation: bdUp .85s cubic-bezier(.22,1,.36,1) forwards; }
        .bd-eyebrow { font-size: 13px; font-weight: 600; letter-spacing: -.01em; color: rgba(255,255,255,.72); }
        .bd-h1 { font-size: clamp(2.35rem, 5.6vw, 4.4rem); font-weight: 800; line-height: 1.14; letter-spacing: -.038em; }
        .bd-sub { font-size: clamp(15px, 1.25vw, 18px); line-height: 1.72; color: rgba(255,255,255,.72); letter-spacing: -.01em; }
        .bd-swipe { position: relative; display: inline-block; }
        .bd-swipe > span { position: relative; z-index: 1; }
        .bd-swipe::before { content: ""; position: absolute; left: -.05em; right: -.05em; bottom: .05em; height: .3em; background: #82F80E; transform: scaleX(0); transform-origin: left; animation: bdSwipe .8s .6s cubic-bezier(.22,1,.36,1) forwards; }
        .bd-kakao { background: #FEE500; color: rgba(0,0,0,.88); letter-spacing: -.02em; }
        .bd-kakao:not(:disabled):hover { transform: translateY(-2px); box-shadow: 0 16px 34px -14px rgba(254,229,0,.6); }
        .bd-badge { transition: opacity .2s ease, transform .2s ease; display: inline-flex; align-items: center; }
        .bd-badge:hover { opacity: .82; transform: translateY(-2px); }
        .bd-card { transition: transform .3s ease, border-color .3s ease; cursor: pointer; }
        .bd-card:hover { transform: translateY(-5px); border-color: rgba(130,248,14,.45); }
        .bd-card:hover .bd-lockchip { background: #82F80E; color: #111; }
        .bd-lockchip { transition: background .25s ease, color .25s ease; }
        .bd-modal { animation: bdPop .28s cubic-bezier(.22,1,.36,1) both; }
        .bd-scrim { animation: bdFade .2s ease both; }
        .bd-ghost { transition: color .2s ease, border-color .2s ease; }
        .bd-ghost:hover { color: #82F80E; border-color: rgba(130,248,14,.5); }
        @media (prefers-reduced-motion: reduce) {
          .bd-up, .bd-swipe::before, .bd-modal, .bd-scrim { animation: none; opacity: 1; transform: none; }
          .bd-swipe::before { transform: scaleX(1); }
        }
      `}</style>

      <section className="relative flex min-h-[84dvh] flex-col overflow-hidden">
        <video className="absolute inset-0 h-full w-full object-cover" src={HERO_VIDEO} autoPlay loop muted playsInline aria-hidden="true" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(12,12,12,.68) 0%, rgba(14,14,14,.6) 38%, rgba(33,33,33,.97) 100%)" }} />

        <header className="relative z-10 flex items-center justify-between px-6 pt-7 sm:px-10">
          <p className="text-[15px] font-extrabold tracking-[.2em]">BDINK</p>
          <button onClick={redirectToKakaoLogin} className="bd-ghost rounded-full border border-white/20 px-4 py-1.5 text-[13px] font-semibold text-white/75">로그인</button>
        </header>

        <div className="relative z-10 mx-auto flex w-full max-w-[680px] flex-1 flex-col items-center justify-center px-6 py-14 text-center">
          <div className="bd-up inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.06] px-3.5 py-1.5 backdrop-blur-sm" style={{ animationDelay: "0ms" }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#82F80E" }} />
            <span className="bd-eyebrow">현직 트레이너 20인의 온라인 클래스</span>
          </div>

          <h1 className="bd-h1 bd-up mt-7" style={{ animationDelay: "90ms" }}>
            헬린이도 헬창도
            <br />
            <span className="bd-swipe"><span>검증된 강사</span></span>에게 배운다
          </h1>

          <p className="bd-sub bd-up mt-6 max-w-[26rem]" style={{ animationDelay: "180ms" }}>
            현직에서 뛰는 트레이너가 직접 만든 강의를
            <br />앱 설치 없이 웹에서 바로 재생합니다.
          </p>

          <div className="bd-up mt-9 w-full max-w-[360px]" style={{ animationDelay: "270ms" }}>
            <KakaoButton ready={isKakaoReady} onClick={redirectToKakaoLogin} size="lg" />
            <p className="mt-3.5 text-[13px] leading-relaxed text-white/50">버딩크는 카카오 계정으로만 로그인해요. 3초면 끝납니다.</p>
          </div>

          <div className="bd-up mt-10 flex items-center gap-6 sm:gap-9" style={{ animationDelay: "360ms" }}>
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-[17px] font-extrabold tracking-tight sm:text-[19px]" style={{ color: "#82F80E" }}>{s.value}</p>
                <p className="mt-0.5 text-[12px] text-white/45">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-12">
        <div className="mb-6 flex items-end justify-between gap-4 px-6 sm:px-10">
          <div>
            <p className="text-[11px] font-bold tracking-[.2em] text-white/35">NOW STREAMING</p>
            <h2 className="mt-2 text-[20px] font-extrabold tracking-[-.03em] text-white sm:text-[24px]">지금 수강할 수 있는 강의</h2>
          </div>
          <button onClick={() => setModalOpen(true)} className="bd-ghost hidden shrink-0 rounded-full border border-white/20 px-4 py-2 text-[13px] font-semibold text-white/70 sm:block">전체 보기</button>
        </div>

        <div className="scroll-hidden w-full overflow-hidden">
          <div className="animate-marquee flex w-max gap-4 px-6 sm:px-10">
            {[...LECTURES, ...LECTURES].map((lecture, i) => (
              <div key={i} onClick={() => setModalOpen(true)} className="bd-card w-[248px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/[.08]" style={{ background: "#181818" }}>
                <div className="relative aspect-video overflow-hidden" style={{ background: lecture.tone }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bd-lockchip inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[11px] font-bold text-white/85 backdrop-blur-sm">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 3a4 4 0 0 0-4 4v3H7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-1V7a4 4 0 0 0-4-4zm0 2a2 2 0 0 1 2 2v3h-4V7a2 2 0 0 1 2-2z" />
                      </svg>
                      로그인 후 재생
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="line-clamp-1 text-[14px] font-bold tracking-[-.02em] text-white/92">{lecture.title}</p>
                  <p className="mt-1.5 text-[12px] text-white/50">{lecture.instructor} 강사</p>
                  <p className="mt-0.5 text-[11px] text-white/35">{lecture.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-20" style={{ background: "linear-gradient(90deg,#212121,transparent)" }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20" style={{ background: "linear-gradient(270deg,#212121,transparent)" }} />
      </section>

      <section className="border-t border-white/[.07] px-6 py-14 text-center">
        <p className="text-[17px] font-bold tracking-[-.02em] text-white/90">앱에서는 더 많은 걸 할 수 있어요</p>
        <p className="mt-2.5 text-[14px] leading-relaxed text-white/50">운동일지 기록과 트레이너 연동은 모바일 앱에서 제공합니다.</p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="bd-badge" aria-label="App Store에서 다운로드">
            <img src={APPLE_BADGE} alt="App Store에서 다운로드" className="h-[46px] w-auto" />
          </a>
          <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="bd-badge -mx-[11px]" aria-label="Google Play에서 다운로드">
            <img src={GOOGLE_BADGE} alt="Google Play에서 다운로드" className="h-[68px] w-auto" />
          </a>
        </div>
      </section>

      <footer className="border-t border-white/[.07] px-6 py-8 text-center">
        <p className="text-[12px] text-white/30">버딩크 주식회사</p>
      </footer>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-labelledby="bd-modal-title">
          <div onClick={() => setModalOpen(false)} className="bd-scrim absolute inset-0 bg-black/75 backdrop-blur-sm" />
          <div className="bd-modal relative w-full max-w-[400px] rounded-t-3xl border border-white/10 p-7 sm:rounded-3xl" style={{ background: "#1C1C1C" }}>
            <div className="flex h-11 w-11 items-center justify-center rounded-full" style={{ background: "rgba(130,248,14,.12)" }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="#82F80E" aria-hidden="true">
                <path d="M12 3a4 4 0 0 0-4 4v3H7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-1V7a4 4 0 0 0-4-4zm0 2a2 2 0 0 1 2 2v3h-4V7a2 2 0 0 1 2-2z" />
              </svg>
            </div>
            <h3 id="bd-modal-title" className="mt-5 text-[20px] font-extrabold tracking-[-.03em] text-white">로그인하고 이어서 보기</h3>
            <p className="mt-2.5 text-[14px] leading-relaxed text-white/60">강의 재생과 수강 기록은 계정에 저장돼요. 버딩크는 카카오 계정으로만 로그인합니다.</p>
            <div className="mt-6">
              <KakaoButton ready={isKakaoReady} onClick={redirectToKakaoLogin} size="md" />
            </div>
            <button onClick={() => setModalOpen(false)} className="mt-3 w-full py-2.5 text-[13px] font-semibold text-white/45 transition hover:text-white/70">다음에 할게요</button>
          </div>
        </div>
      )}
    </main>
  );
}
