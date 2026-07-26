import Link from "next/link";

const MOCK_CARDS = [
  { title: "10년의 경험을 1시간으로", instructor: "박윤창 강사", gradient: "from-orange-500/40 to-red-600/40" },
  { title: "보디빌딩 실전 보조제 선별", instructor: "사과코치 강사", gradient: "from-emerald-500/40 to-teal-600/40" },
  { title: "나만의 강점을 만드는 운동법", instructor: "엠마누엘 강사", gradient: "from-blue-500/40 to-indigo-600/40" },
  { title: "2025년 상체 루틴 총정리", instructor: "신동준 강사", gradient: "from-purple-500/40 to-pink-600/40" },
  { title: "런칭 세미나: 버딩크 x 레드뉴트리션", instructor: "사과코치 강사", gradient: "from-yellow-500/40 to-orange-600/40" },
  { title: "상체 부위에 따른 대외비 모음집", instructor: "좌용관 강사", gradient: "from-cyan-500/40 to-blue-600/40" },
];

// 실제 숫자로 교체 필요 (지금은 예시 placeholder)
const STATS = [
  { label: "누적 회원", value: "1,000+" },
  { label: "등록 강의", value: "80+" },
  { label: "함께하는 트레이너", value: "20+" },
];

const INSTRUCTORS = ["사과코치", "엠마누엘", "좌용관", "신동준", "박윤창"];

export default function LandingPage() {
  const marqueeCards = [...MOCK_CARDS, ...MOCK_CARDS]; // 무한 스크롤을 위해 두 배로 복제

  return (
    <main className="min-h-screen bg-base-bg text-text-primary">
      {/* 히어로 */}
      <section className="flex flex-col items-center justify-center gap-6 px-6 py-20 text-center">
        <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl">
          트레이너와 함께하는
          <br />
          <span className="text-brand">온라인 강의</span>
        </h1>
        <p className="max-w-md text-text-secondary">
          현직 트레이너들의 실전 노하우를 담은 강의로
          <br />
          더 빠르게, 더 정확하게 성장하세요.
        </p>
        <Link
          href="/login"
          className="rounded-pill bg-brand px-8 py-3 font-bold text-black transition hover:opacity-90"
        >
          로그인하고 시작하기
        </Link>
      </section>

      {/* 신뢰 지표 */}
      <section className="border-y border-base-border bg-base-card/40 px-6 py-8">
        <div className="mx-auto grid max-w-md grid-cols-3 gap-4 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="text-xl font-extrabold text-brand sm:text-2xl">{stat.value}</p>
              <p className="mt-1 text-xs text-text-secondary sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 강사진 소개 */}
      <section className="px-6 py-10 text-center">
        <h2 className="mb-1 text-lg font-bold">검증된 트레이너진과 함께</h2>
        <p className="mb-6 text-sm text-text-secondary">현직에서 활동 중인 전문 강사들의 강의</p>
        <div className="flex flex-wrap justify-center gap-3">
          {INSTRUCTORS.map((name) => (
            <div
              key={name}
              className="flex items-center gap-2 rounded-pill border border-base-border bg-base-card px-4 py-2"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-bold text-black">
                {name[0]}
              </span>
              <span className="text-sm font-medium">{name} 강사</span>
            </div>
          ))}
        </div>
      </section>

      {/* 가로 무한 스크롤 강의 미리보기 + 하단 그라데이션 CTA */}
      <section className="relative overflow-hidden py-8">
        <h2 className="mb-4 px-6 text-center text-lg font-bold text-text-secondary">
          이런 강의들을 만나보세요
        </h2>

        <div className="scroll-hidden pointer-events-none w-full overflow-hidden blur-[2px]">
          <div className="animate-marquee flex w-max gap-3 px-4">
            {marqueeCards.map((card, i) => (
              <div key={i} className="w-[220px] flex-shrink-0 overflow-hidden rounded-card bg-base-card">
                <div className={`aspect-video bg-gradient-to-br ${card.gradient}`} />
                <div className="p-3">
                  <p className="line-clamp-1 text-sm font-medium">{card.title}</p>
                  <p className="text-xs text-text-secondary">{card.instructor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 그라데이션 오버레이 + CTA */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-56 flex-col items-center justify-end gap-4 bg-gradient-to-t from-base-bg via-base-bg/90 to-transparent pb-4">
          <p className="pointer-events-none text-sm text-text-secondary">
            로그인하면 모든 강의를 볼 수 있어요
          </p>
          <Link
            href="/login"
            className="pointer-events-auto rounded-pill bg-brand px-8 py-3 font-bold text-black transition hover:opacity-90"
          >
            로그인하고 계속 보기
          </Link>
        </div>
      </section>
    </main>
  );
}
