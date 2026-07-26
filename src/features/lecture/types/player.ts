export interface LectureMediaData {
  url: string;
  lectureTitle: string;
  instructorName: string | null; // iOS의 InstructorName(대문자 시작) - 실제 JSON 키는 응답 확인 후 조정 필요
  prevLectureId: number | null;
  nextLectureId: number | null;
}

export interface LectureProgressData {
  lectureId: number;
  lastPositionSec: number;
  maxPositionSec: number;
  durationSec: number;
  progressPercent: number;
  completed: boolean;
  lastWatchedAt: string | null;
}

export interface LectureProgressRequest {
  positionSec: number;
  durationSec: number;
  eventType: string; // 정확한 enum 값(START/PROGRESS/PAUSE/COMPLETE 등) 백엔드 확인 필요 - 우선 "PROGRESS" 사용
  sessionId: string;
  clientOccurredAt: string;
}
