'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface MediaVideoPlayerProps {
  videoKey: string;
  iframeId: string;
  title: string;
  isMuted: boolean;
  onToggleMute: (e: React.MouseEvent) => void;
}

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

    const checkYT = setInterval(() => {
      if (window.YT && window.YT.Player) {
        clearInterval(checkYT);
        resolve();
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
}: MediaVideoPlayerProps) => {
  const playerRef = useRef<any>(null);

  // Sync mute state
  useEffect(() => {
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

            if (!isMuted) {
              player.unMute();
            }
          },

          onStateChange: (event: any) => {
            const player = event.target;

            // ✅ Only run when video is actually playing
            if (event.data === window.YT.PlayerState.PLAYING) {
              setTimeout(() => {
                try {
                  player.setPlaybackQualityRange?.('highres');
                  player.setPlaybackQuality('highres');
                } catch (e) {
                  console.warn('Quality setting failed', e);
                }
              }, 200);
            }
          },
        },
      });
    };

    initPlayer();

    return () => {
      isMounted = false;
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
    <div className="animate-fadeIn absolute inset-0 overflow-hidden rounded-[10.92px] bg-black">
      {/* Click overlay */}
      <div className="absolute inset-0 z-40 cursor-pointer" onClick={onToggleMute} />

      {/* Mute button */}
      <button
        type="button"
        onClick={onToggleMute}
        className="absolute right-3 bottom-3 z-50 flex size-13 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-all hover:scale-110 active:scale-95"
      >
        {isMuted ? <VolumeX size={23} /> : <Volume2 size={23} />}
      </button>

      {/* Video container */}
      <div className="pointer-events-none h-full w-full">
        <iframe
          id={iframeId}
          className="h-full w-full object-cover"
          src={`https://www.youtube.com/embed/${videoKey}?enablejsapi=1&autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&loop=1&playlist=${videoKey}`}
          allow="autoplay; encrypted-media"
          title={`${title} Trailer`}
        />
      </div>
    </div>
  );
};
