"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLectureDetail, useLectureChapters } from "@/features/lecture/hooks/use-lecture";
import { LecturePlayer } from "@/features/lecture/components/lecture-player";
import { paymentApi } from "@/features/payment/api/payment-api";

export default function LectureDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const router = useRouter();
  const { data: lecture, isLoading } = useLectureDetail(id);
  const { data: chapterData } = useLectureChapters(id);
  const [activeLectureId, setActiveLectureId] = useState<number | null>(null);
  const [isEnrolling, setIsEnrolling] = useState(false);

  if (isLoading || !lecture) {
    return <div className="p-8 text-center text-text-secondary">불러오는 중...</div>;
  }

  const { priceDetail } = lecture;
  // 가격 기준 무료 여부 (payment 필드와 무관 - payment는 "이미 구매했는지" 여부임)
  const isFree = priceDetail.originPrice === 0;
  // payment 필드 = 이미 구매(수강)했는지 여부 (iOS LectureViewModel 기준)
  const isPurchased = lecture.payment;
  // 시청 가능 여부 = 구매완료 또는 무료강의인 경우만
  const canWatch = isPurchased || isFree;
  const finalPrice =
    priceDetail.finalPrice ??
    Math.round(priceDetail.originPrice * (1 - priceDetail.discountRate / 100));

  const handleLectureClick = (lectureId: number) => {
    if (!canWatch) {
      alert("구매 후 시청하실 수 있습니다.");
      return;
    }
    setActiveLectureId(lectureId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFreeEnroll = async () => {
    setIsEnrolling(true);
    try {
      await paymentApi.startSugang(id);
      router.refresh();
    } catch (e) {
      alert("수강 시작 중 문제가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsEnrolling(false);
    }
  };

  // 시청 불가 상태면(구매 전) activeLectureId가 어떤 경로로 세팅되든 플레이어를 렌더링하지 않음
  const playableLectureId = canWatch ? activeLectureId : null;

  return (
    <main className="min-h-screen bg-base-bg pb-24 text-text-primary">
      <div className="mx-4 mt-4">
        {playableLectureId ? (
          <LecturePlayer lectureId={playableLectureId} onChangeLecture={setActiveLectureId} />
        ) : lecture.thumbnail ? (
          <div className="relative aspect-video overflow-hidden rounded-card">
            <Image src={lecture.thumbnail} alt={lecture.title} fill className="object-cover" />
          </div>
        ) : (
          <div className="flex aspect-video items-center justify-center rounded-card bg-base-card text-text-muted">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M8.5 12.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5z" />
            </svg>
          </div>
        )}
      </div>

      <div className="px-4">
        <h1 className="mt-4 text-xl font-bold">{lecture.title}</h1>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full bg-base-card">
              {lecture.instructorProfile && (
                <Image src={lecture.instructorProfile} alt={lecture.instructor} fill className="object-cover" />
              )}
            </div>
            <span className="text-sm text-text-secondary">{lecture.instructor}</span>
          </div>
          <div className="flex items-center gap-4 text-text-secondary">
            <button className="flex flex-col items-center gap-0.5 text-xs">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              {lecture.bookmarkCount}
            </button>
            <button className="flex flex-col items-center gap-0.5 text-xs">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />
              </svg>
              공유
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-2 text-sm text-text-secondary">
          {lecture.level && (
            <p className="flex items-center gap-2">
              <span>▤</span> {lecture.level}
            </p>
          )}
          <p className="flex items-center gap-2">
            <span>◷</span> 러닝타임 : {lecture.totalLectureTime}
          </p>
        </div>

        <div className="my-6 border-t border-base-border" />

        <div className="flex items-center justify-between">
          <span className="text-text-secondary">
            {isPurchased ? "구매 상태" : isFree ? "런칭 이벤트" : "가격"}
          </span>
          {isPurchased ? (
            <span className="font-bold text-brand">구매완료</span>
          ) : isFree ? (
            <span className="font-bold text-brand">무료제공</span>
          ) : (
            <span className="font-bold">
              {finalPrice.toLocaleString()}원{" "}
              {priceDetail.discountRate > 0 && (
                <span className="text-red-400">{priceDetail.discountRate}%</span>
              )}
            </span>
          )}
        </div>

        <div className="my-6 border-t border-base-border" />

        <h2 className="text-lg font-bold">강의 정보</h2>
        <p className="mt-2 whitespace-pre-line text-sm text-text-secondary">{lecture.introduction}</p>

        {chapterData && (
          <div className="mt-8 space-y-6">
            {chapterData.totalLectures > 0 && (
              <p className="text-sm text-text-secondary">
                전체 진행률 {Math.round(chapterData.totalProgress)}% ({chapterData.completedLectures}/
                {chapterData.totalLectures})
              </p>
            )}

            {chapterData.chapters.map((chapter, i) => (
              <div key={i}>
                <h3 className="mb-2 font-semibold">{chapter.title}</h3>
                <ul className="space-y-1">
                  {chapter.lectures.map((lec) => (
                    <li key={lec.lectureId}>
                      <button
                        onClick={() => handleLectureClick(lec.lectureId)}
                        className={`flex w-full items-center justify-between rounded-card px-3 py-2 text-left text-sm transition ${
                          activeLectureId === lec.lectureId
                            ? "bg-brand/20 text-brand"
                            : "bg-base-card hover:bg-base-card/70"
                        } ${!canWatch ? "opacity-60" : ""}`}
                      >
                        <span className="flex items-center gap-2">
                          {canWatch ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="5" y="11" width="14" height="9" rx="1.5" />
                              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                            </svg>
                          )}
                          {lec.title}
                        </span>
                        <span className="flex items-center gap-2 text-text-muted">
                          {canWatch && lec.progress && lec.progress !== "0%" && (
                            <span className="text-xs text-brand">{lec.progress}</span>
                          )}
                          {lec.lectureTime}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {!activeLectureId && (
        <div className="fixed bottom-0 left-0 right-0 border-t border-base-border bg-base-bg p-4">
          {isPurchased ? (
            // 이미 구매/수강중 - 결제 없이 바로 학습 (챕터 목록 클릭해서 재생하면 됨을 안내)
            <button
              disabled
              className="w-full rounded-pill bg-base-card py-3 font-bold text-text-secondary"
            >
              이미 수강 중인 강의입니다
            </button>
          ) : isFree ? (
            <button
              onClick={handleFreeEnroll}
              disabled={isEnrolling}
              className="w-full rounded-pill bg-brand py-3 font-bold text-black disabled:opacity-40"
            >
              {isEnrolling ? "처리 중..." : "무료로 수강하기"}
            </button>
          ) : (
            <Link
              href={`/checkout?classRoomId=${id}&price=${finalPrice}&title=${encodeURIComponent(lecture.title)}`}
              className="block w-full rounded-pill bg-brand py-3 text-center font-bold text-black"
            >
              {finalPrice.toLocaleString()}원 구매하기
            </Link>
          )}
        </div>
      )}
    </main>
  );
}
