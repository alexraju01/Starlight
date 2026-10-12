'use client';

import clsx from 'clsx';
import { Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface MediaVideoPlayerProps {
  videoKey: string;
  iframeId: string;
  title: string;
  isMuted: boolean;
  onToggleMute: (e: React.MouseEvent) => void;
  isCarousel?: boolean;
}

/*
 * YouTube still draws its own chrome with `controls=0` (title + channel bar along the top,
 * logo, thumbnail and spinner before playback). The iframe is sized to cover the frame at
 * 16:9 and overscanned so those overlays sit outside the visible area. YouTube shrinks its
 * chrome on small players, so the overscan scales with the frame (hover cards) up to a cap
 * (the full-width carousel).
 */
const OVERSCAN = 'min(140px, 40cqh)';
/**
 * YouTube can report PLAYING while its big play button is still on screen, so the video is
 * only revealed once the playhead has really moved this far (seconds) since it started.
 */
const REVEAL_AFTER_PLAYED_S = 0.5;
const COVER_SIZE = (() => {
  const height = `calc(max(100cqh, 56.25cqw) + ${OVERSCAN})`;
  return { height, width: `calc(${height} * 16 / 9)` };
})();

// Load YouTube API
const loadYouTubeAPI = () => {
  if (typeof window !== 'undefined' && window.YT && window.YT.Player) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
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
      if (window.YT && window.YT.Player) {
        clearInterval(checkYT);
        resolve();
      } else if (Date.now() - startedAt > 15000) {
        // e.g. blocked by an ad/content blocker – stop polling.
        clearInterval(checkYT);
      }
    }, 100);
  });
};

export const MediaVideoPlayer = ({
  videoKey,
  iframeId,
  title,
  isMuted,
  onToggleMute,
  isCarousel = false,
}: MediaVideoPlayerProps) => {
  const playerRef = useRef<any>(null);
  // Only shown while frames are actually playing, so YouTube's thumbnail, title, spinner
  // and big play button never show.
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const revealPollRef = useRef<ReturnType<typeof setInterval>>(undefined);

  // Latest mute state for the player's onReady callback, without rebuilding the player
  // (and restarting the trailer) every time sound is toggled.
  const isMutedRef = useRef(isMuted);

  useEffect(() => {
    isMutedRef.current = isMuted;
    if (playerRef.current && typeof playerRef.current.mute === 'function') {
      if (isMuted) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
      }
    }
  }, [isMuted]);

  // Init player
  useEffect(() => {
    let isMounted = true;

    const initPlayer = async () => {
      await loadYouTubeAPI();
      if (!isMounted) return;

      playerRef.current = new window.YT.Player(iframeId, {
        events: {
          onReady: (event: any) => {
            const player = event.target;

            player.mute();
            player.playVideo();

            if (!isMutedRef.current) {
              player.unMute();
            }
          },

          onStateChange: (event: any) => {
            const player = event.target;
            const { PLAYING } = window.YT.PlayerState;
            // Any other state (buffering, paused, ended, restarting the loop) is where YouTube
            // draws a spinner or play button in the middle, so hide the video then. On
            // PLAYING, reveal it only once frames are visibly advancing.
            clearInterval(revealPollRef.current);
            if (event.data === PLAYING) {
              const startedAt = player.getCurrentTime?.() ?? 0;
              revealPollRef.current = setInterval(() => {
                const played = (player.getCurrentTime?.() ?? 0) - startedAt;
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
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.error('Player cleanup error', e);
        }
        playerRef.current = null;
      }
    };
  }, [videoKey, iframeId]);

  return (
    // Transparent: the artwork rendered underneath stays visible until the video fades in.
    <div className="absolute inset-0 overflow-hidden rounded-[10.92px]">
      {/* Only show these if NOT in a carousel */}
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
        className="absolute right-4 bottom-4 z-50 flex size-13 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-all"
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
};
