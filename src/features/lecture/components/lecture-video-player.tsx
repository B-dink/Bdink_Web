"use client";

import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

interface Props {
  src: string; // 서명 URL (HLS m3u8 or mp4)
  onProgress?: (positionSeconds: number) => void;
}

export function LectureVideoPlayer({ src, onProgress }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<ReturnType<typeof videojs> | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const player = videojs(videoRef.current, {
      controls: true,
      responsive: true,
      fluid: true,
      playbackRates: [0.75, 1, 1.25, 1.5, 2],
      sources: [{ src, type: src.includes(".m3u8") ? "application/x-mpegURL" : "video/mp4" }],
    });

    playerRef.current = player;

    const interval = setInterval(() => {
      if (onProgress && !player.paused()) {
        onProgress(Math.floor(player.currentTime() ?? 0));
      }
    }, 10_000); // 10초마다 진행률 서버 전송

    return () => {
      clearInterval(interval);
      player.dispose();
    };
  }, [src, onProgress]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered rounded-card" />
    </div>
  );
}
