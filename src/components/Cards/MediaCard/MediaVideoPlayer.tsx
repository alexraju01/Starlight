'use client';

import clsx from 'clsx';
import { Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { logError } from '@/utils/logger';

import type { YTNamespace, YTPlayer } from '@/types/youtube';

interface Props {
  videoKey: string;
  iframeId: string;
  title: string;
  isMuted: boolean;
  onToggleMute: (e: React.MouseEvent) => void;
  /** The hero carousel has its own mute button and no click-to-mute overlay. */
  isCarousel?: boolean;
}

// YouTube draws chrome even with `controls=0` (title bar, logo, spinner). The iframe covers
// the frame at 16:9 and is overscanned so that chrome sits outside the visible area; the
// overscan scales with the frame, as YouTube shrinks its chrome on small players.
const OVERSCAN = 'min(140px, 40cqh)';
const COVER_HEIGHT = `calc(max(100cqh, 56.25cqw) + ${OVERSCAN})`;
const COVER_SIZE = { height: COVER_HEIGHT, width: `calc(${COVER_HEIGHT} * 16 / 9)` };

/** YouTube can report PLAYING while its play button is still up: reveal after this much playback (s). */
const REVEAL_AFTER_PLAYED_S = 0.5;
/** Give up waiting for the API script (e.g. blocked by a content blocker). */
const API_TIMEOUT_MS = 15_000;

/** Loads the YouTube IFrame API once; never resolves if it's blocked. */
const loadYouTubeAPI = (): Promise<YTNamespace> => {
  if (typeof window !== 'undefined' && window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  return new Promise<YTNamespace>((resolve) => {
    const existingScript = document.getElementById('youtube-sdk');

    if (!existingScript) {
      const tag = document.createElement('script');
      tag.id = 'youtube-sdk';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const startedAt = Date.now();
    const checkYT = setInterval(() => {
      if (window.YT?.Player) {
        clearInterval(checkYT);
        resolve(window.YT);
      } else if (Date.now() - startedAt > API_TIMEOUT_MS) {
        clearInterval(checkYT);
      }
    }, 100);
  });
};

/** Muted, chrome-free YouTube trailer that fades in over the artwork once it's really playing. */
export default function MediaVideoPlayer({
  videoKey,
  iframeId,
  title,
  isMuted,
  onToggleMute,
  isCarousel = false,
}: Props) {
  const playerRef = useRef<YTPlayer | null>(null);
  // Hidden whenever YouTube could be showing its own thumbnail, spinner or play button.
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const revealPollRef = useRef<ReturnType<typeof setInterval>>(undefined);
  // Read by onReady without rebuilding the player (and restarting it) on every toggle.
  const isMutedRef = useRef(isMuted);

  useEffect(() => {
    isMutedRef.current = isMuted;
    if (isMuted) playerRef.current?.mute();
    else playerRef.current?.unMute();
  }, [isMuted]);

  useEffect(() => {
    let isMounted = true;

    const initPlayer = async () => {
      const YT = await loadYouTubeAPI();
      if (!isMounted) return;

      playerRef.current = new YT.Player(iframeId, {
        events: {
          onReady: (event) => {
            const player = event.target;

            player.mute();
            player.playVideo();
            if (!isMutedRef.current) player.unMute();
          },

          onStateChange: (event) => {
            const player = event.target;
            // Every state but PLAYING shows YouTube's spinner or play button: hide the video.
            clearInterval(revealPollRef.current);
            if (event.data === YT.PlayerState.PLAYING) {
              const startedAt = player.getCurrentTime();
              revealPollRef.current = setInterval(() => {
                const played = player.getCurrentTime() - startedAt;
                if (played < REVEAL_AFTER_PLAYED_S) return;
                clearInterval(revealPollRef.current);
                setIsVideoVisible(true);
              }, 100);
            } else {
              setIsVideoVisible(false);
            }
          },
        },
      });
    };

    setIsVideoVisible(false);
    initPlayer();

    return () => {
      isMounted = false;
      clearInterval(revealPollRef.current);
      try {
        playerRef.current?.destroy();
      } catch (error) {
        logError('Trailer player cleanup', error);
      }
      playerRef.current = null;
    };
  }, [videoKey, iframeId]);

  return (
    // Transparent, so the artwork underneath shows until the video fades in.
    <div className="absolute inset-0 overflow-hidden rounded-[8px]">
      {!isCarousel && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-40 cursor-pointer"
          onClick={onToggleMute}
        />
      )}
      <button
        type="button"
        onClick={onToggleMute}
        aria-label={isMuted ? 'Unmute trailer' : 'Mute trailer'}
        aria-pressed={!isMuted}
        className="absolute right-[10px] bottom-[10px] z-50 flex size-[32px] cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-all"
      >
        {isMuted ? <VolumeX size={23} aria-hidden /> : <Volume2 size={23} aria-hidden />}
      </button>

      <div
        className={clsx(
          '[container-type:size] pointer-events-none absolute inset-0 transition-opacity duration-500',
          isVideoVisible ? 'opacity-100' : 'opacity-0',
        )}
      >
        <iframe
          id={iframeId}
          className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
          style={COVER_SIZE}
          src={`https://www.youtube-nocookie.com/embed/${videoKey}?enablejsapi=1&autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&loop=1&playlist=${videoKey}`}
          allow="autoplay; encrypted-media"
          tabIndex={-1}
          title={`${title} Trailer`}
        />
      </div>
    </div>
  );
}
