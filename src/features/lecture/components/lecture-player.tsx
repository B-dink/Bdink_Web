"use client";

import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { useLectureMedia, useLectureProgress, useSaveProgress } from "../hooks/use-lecture-player";

interface Props {
  lectureId: number;
  onChangeLecture: (lectureId: number) => void;
}

export function LecturePlayer({ lectureId, onChangeLecture }: Props) {
  const { data: media, isLoading: isMediaLoading } = useLectureMedia(lectureId);
  const { data: progress } = useLectureProgress(lectureId);
  const { mutate: saveProgress } = useSaveProgress();

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<ReturnType<typeof videojs> | null>(null);
  const sessionIdRef = useRef<string>(crypto.randomUUID());
  const hasResumedRef = useRef(false);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    // 강의가 바뀔 때마다 새 시청 세션으로 취급
    sessionIdRef.current = crypto.randomUUID();
    hasResumedRef.current = false;
    hasStartedRef.current = false;
  }, [lectureId]);

  useEffect(() => {
    if (!videoRef.current || !media) return;

    const player = videojs(videoRef.current, {
      controls: true,
      responsive: true,
      fluid: true,
      playbackRates: [0.75, 1, 1.25, 1.5, 2],
      sources: [
        {
          src: media.url,
          type: media.url.includes(".m3u8") ? "application/x-mpegURL" : "video/mp4",
        },
      ],
    });

    playerRef.current = player;

    const reportProgress = (eventType: string) => {
      const positionSec = Math.floor(player.currentTime() ?? 0);
      const durationSec = Math.floor(player.duration() ?? 0);
      if (durationSec <= 0) return;
      saveProgress({
        lectureId,
        positionSec,
        durationSec,
        eventType,
        sessionId: sessionIdRef.current,
      });
    };

    player.on("loadedmetadata", () => {
      // 이어보기: 저장된 마지막 위치로 이동 (진행률 데이터가 있고, 아직 이어보기 안 한 경우만)
      if (progress && progress.lastPositionSec > 0 && !hasResumedRef.current) {
        player.currentTime(progress.lastPositionSec);
        hasResumedRef.current = true;
      }
    });

    player.on("play", () => {
      if (!hasStartedRef.current) {
        reportProgress("START");
        hasStartedRef.current = true;
      }
    });

    player.on("pause", () => reportProgress("PAUSE"));
    player.on("ended", () => {
      reportProgress("COMPLETE");
      if (media.nextLectureId) {
        onChangeLecture(media.nextLectureId);
      }
    });

    // 10초마다 진행률 저장
    const interval = setInterval(() => {
      if (!player.paused()) {
        reportProgress("PROGRESS");
      }
    }, 10_000);

    return () => {
      clearInterval(interval);
      // 나가기 전 마지막 위치 저장
      reportProgress("PAUSE");
      player.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [media, lectureId]);

  if (isMediaLoading || !media) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-card bg-base-card text-text-secondary">
        영상을 불러오는 중...
      </div>
    );
  }

  return (
    <div>
      <div data-vjs-player>
        <video ref={videoRef} className="video-js vjs-big-play-centered rounded-card" />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm font-medium text-text-primary">{media.lectureTitle}</p>
        <div className="flex gap-2">
          <button
            disabled={!media.prevLectureId}
            onClick={() => media.prevLectureId && onChangeLecture(media.prevLectureId)}
            className="rounded-pill border border-base-border px-3 py-1 text-xs text-text-secondary disabled:opacity-30"
          >
            이전 강의
          </button>
          <button
            disabled={!media.nextLectureId}
            onClick={() => media.nextLectureId && onChangeLecture(media.nextLectureId)}
            className="rounded-pill border border-base-border px-3 py-1 text-xs text-text-secondary disabled:opacity-30"
          >
            다음 강의
          </button>
        </div>
      </div>
    </div>
  );
}
