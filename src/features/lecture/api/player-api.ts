import { apiClient } from "@/shared/api/client";
import type { LectureMediaData, LectureProgressData, LectureProgressRequest } from "../types/player";

interface BaseResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export const playerApi = {
  // GET /api/v1/lecture/{lectureId}/media
  getMedia: async (lectureId: number): Promise<LectureMediaData> => {
    const { data } = await apiClient.get<BaseResponse<LectureMediaData>>(
      `/api/v1/lecture/${lectureId}/media`
    );
    return data.data;
  },

  // GET /api/v1/lecture/{lectureId}/progress
  getProgress: async (lectureId: number): Promise<LectureProgressData> => {
    const { data } = await apiClient.get<BaseResponse<LectureProgressData>>(
      `/api/v1/lecture/${lectureId}/progress`
    );
    return data.data;
  },

  // POST /api/v1/lecture/{lectureId}/progress
  saveProgress: async (
    lectureId: number,
    body: LectureProgressRequest
  ): Promise<LectureProgressData> => {
    const { data } = await apiClient.post<BaseResponse<LectureProgressData>>(
      `/api/v1/lecture/${lectureId}/progress`,
      body
    );
    return data.data;
  },
};
