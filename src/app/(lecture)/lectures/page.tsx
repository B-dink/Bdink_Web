"use client";

import { useQuery } from "@tanstack/react-query";
import { lectureApi } from "@/features/lecture/api/lecture-api";
import { LectureSection } from "@/features/lecture/components/lecture-section";
import { PromotionCarousel } from "@/features/lecture/components/promotion-carousel";

// 백엔드 확인된 career enum 값 매핑
const CAREER_LABELS: Record<string, string> = {
  PODCAST: "팟캐스트",
  REHABILITATION: "재활",
  NUTRITION: "영양",
  BODYBUILDING: "보디빌딩",
};

function careerLabel(career: string | undefined) {
  if (!career) return "추천 강의";
  return CAREER_LABELS[career] ?? career;
}

export default function LectureFeedPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["lectures", "all"],
    queryFn: lectureApi.getAll,
  });

  if (isLoading) {
    return <div className="p-8 text-center text-text-secondary">불러오는 중...</div>;
  }

  const promotions = data?.promotionDtos ?? [];
  const careerGroups = data?.classroomDtoByCareer ?? [];

  return (
    <main className="min-h-screen bg-base-bg pb-16">
      <PromotionCarousel promotions={promotions} />

      {careerGroups.map((group, i) => (
        <LectureSection
          key={i}
          title={`${careerLabel(group.classrooms[0]?.career)} 매니아라면 한번 쯤 본 강의`}
          classrooms={group.classrooms}
        />
      ))}
    </main>
  );
}
