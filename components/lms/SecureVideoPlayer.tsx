"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  requestVideoPlayback,
  saveVideoProgress,
  type VideoPlayback,
} from "@/lib/api/student-client";

type Props = {
  videoId: string;
  title: string;
  initialPosition?: number;
  onProgress?: (pct: number, completed: boolean) => void;
};

export default function SecureVideoPlayer({
  videoId,
  title,
  initialPosition = 0,
  onProgress,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playback, setPlayback] = useState<VideoPlayback | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [wmPos, setWmPos] = useState({ x: 8, y: 12 });
  const lastSaveRef = useRef(0);
  const refreshTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadPlayback = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await requestVideoPlayback(videoId);
      setPlayback(data);
      const ms = Math.max(30_000, (data.expires_in_seconds - 60) * 1000);
      if (refreshTimer.current) clearTimeout(refreshTimer.current);
      refreshTimer.current = setTimeout(() => {
        void loadPlayback();
      }, ms);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Playback unavailable");
      setPlayback(null);
    } finally {
      setLoading(false);
    }
  }, [videoId]);

  useEffect(() => {
    void loadPlayback();
    return () => {
      if (refreshTimer.current) clearTimeout(refreshTimer.current);
    };
  }, [loadPlayback]);

  useEffect(() => {
    const id = setInterval(() => {
      setWmPos({
        x: 6 + Math.random() * 55,
        y: 8 + Math.random() * 60,
      });
    }, 12_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onVis = () => {
      const el = videoRef.current;
      if (!el) return;
      if (document.hidden) el.pause();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !playback?.playback_url) return;
    el.src = playback.playback_url;
    if (initialPosition > 0) {
      const seek = () => {
        try {
          el.currentTime = initialPosition;
        } catch {
          /* ignore */
        }
        el.removeEventListener("loadedmetadata", seek);
      };
      el.addEventListener("loadedmetadata", seek);
    }
  }, [playback?.playback_url, initialPosition]);

  async function persistProgress(force = false) {
    const el = videoRef.current;
    if (!el || !Number.isFinite(el.duration) || el.duration <= 0) return;
    const now = Date.now();
    if (!force && now - lastSaveRef.current < 8_000) return;
    lastSaveRef.current = now;
    const pct = Math.min(100, (el.currentTime / el.duration) * 100);
    const completed = pct >= 90 || el.ended;
    try {
      await saveVideoProgress(videoId, {
        position_seconds: Math.floor(el.currentTime),
        watched_percent: Math.round(pct * 100) / 100,
        is_completed: completed,
      });
      onProgress?.(pct, completed);
    } catch {
      /* non-blocking */
    }
  }

  return (
    <div
      className="relative aspect-video w-full overflow-hidden bg-slate-950 shadow-inner flex items-center justify-center"
      onContextMenu={(e) => e.preventDefault()}
    >
      {loading && !playback ? (
        <div className="flex flex-col items-center justify-center gap-2 text-slate-400 text-xs">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" />
          <span>Preparing secure playback…</span>
        </div>
      ) : error ? (
        <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
          <p className="text-xs font-medium text-red-400">{error}</p>
          <button
            type="button"
            onClick={() => void loadPlayback()}
            className="rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-500 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            className="h-full w-full max-h-[75vh] object-contain shadow-2xl"
            controls
            controlsList="nodownload noplaybackrate"
            disablePictureInPicture
            playsInline
            preload="metadata"
            onTimeUpdate={() => void persistProgress(false)}
            onPause={() => void persistProgress(true)}
            onEnded={() => void persistProgress(true)}
            title={title}
          />
          {playback?.watermark ? (
            <div
              className="pointer-events-none absolute select-none rounded-md bg-black/40 backdrop-blur-md px-2.5 py-1 text-[10px] leading-tight text-white/70 border border-white/10 shadow-sm"
              style={{ left: `${wmPos.x}%`, top: `${wmPos.y}%` }}
            >
              <div className="font-semibold text-white/90">{playback.watermark.name}</div>
              <div className="text-white/60">{playback.watermark.email}</div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

