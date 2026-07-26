import { apiClient } from "@/shared/api/client";
import type { ClassroomFeedData, DetailClassRoom, ChapterData, SignedVideoUrl } from "../types/lecture";

interface BaseResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export const lectureApi = {
  // GET /api/v1/classroom/all - 프로모션 + career별 그룹 목록
  getAll: async (): Promise<ClassroomFeedData> => {
    const { data } = await apiClient.get<BaseResponse<ClassroomFeedData>>("/api/v1/classroom/all");
    return data.data;
  },

  // GET /api/v1/classroom/class-detail/{id} - 강의 상세
  getDetail: async (id: number): Promise<DetailClassRoom> => {
    const { data } = await apiClient.get<BaseResponse<DetailClassRoom>>(
      `/api/v1/classroom/class-detail/${id}`
    );
    return data.data;
  },

  // GET /api/v1/classroom/chapter?id=xxx - 챕터/진행률
  getChapters: async (id: number): Promise<ChapterData> => {
    const { data } = await apiClient.get<BaseResponse<ChapterData>>("/api/v1/classroom/chapter", {
      params: { id },
    });
    return data.data;
  },

  // 유료 강의 영상 재생을 위한 서명 URL 발급 - 백엔드 신규 엔드포인트 필요 (아직 없음, 추정 경로)
  getSignedVideoUrl: async (lectureId: number): Promise<SignedVideoUrl> => {
    const { data } = await apiClient.post<SignedVideoUrl>(`/api/v1/classroom/lecture/${lectureId}/video-url`);
    return data;
  },

  reportProgress: async (lectureId: number, positionSeconds: number): Promise<void> => {
    await apiClient.patch(`/api/v1/classroom/lecture/${lectureId}/progress`, {
      positionSeconds,
    });
  },
};
