import { useQuery, useMutation } from "@tanstack/react-query";
import { playerApi } from "../api/player-api";

export function useLectureMedia(lectureId: number | null) {
  return useQuery({
    queryKey: ["player", "media", lectureId],
    queryFn: () => playerApi.getMedia(lectureId!),
    enabled: !!lectureId,
  });
}

export function useLectureProgress(lectureId: number | null) {
  return useQuery({
    queryKey: ["player", "progress", lectureId],
    queryFn: () => playerApi.getProgress(lectureId!),
    enabled: !!lectureId,
    retry: false, // 시청 이력 없으면 404/빈값 날 수 있으므로 재시도 안 함
  });
}

export function useSaveProgress() {
  return useMutation({
    mutationFn: ({
      lectureId,
      positionSec,
      durationSec,
      eventType,
      sessionId,
    }: {
      lectureId: number;
      positionSec: number;
      durationSec: number;
      eventType: string;
      sessionId: string;
    }) =>
      playerApi.saveProgress(lectureId, {
        positionSec,
        durationSec,
        eventType,
        sessionId,
        clientOccurredAt: new Date().toISOString(),
      }),
  });
}
