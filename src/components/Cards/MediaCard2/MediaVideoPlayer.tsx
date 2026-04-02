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

// --- MISSING HELPER FUNCTION ---
const loadYouTubeAPI = () => {
  // Check if API is already loaded
  if (typeof window !== 'undefined' && window.YT && window.YT.Player) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    // Check if the script tag already exists to avoid duplicates
    const existingScript = document.getElementById('youtube-sdk');
    if (!existingScript) {
      const tag = document.createElement('script');
      tag.id = 'youtube-sdk';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Polling check for YT readiness
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

  // 1. Sync the isMuted prop with the YouTube Player instance
  useEffect(() => {
    if (playerRef.current && typeof playerRef.current.mute === 'function') {
      if (isMuted) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
      }
    }
  }, [isMuted]);

  // 2. Initialize Player
  useEffect(() => {
    let isMounted = true;

    const initPlayer = async () => {
      await loadYouTubeAPI();

      // Safety check to ensure component hasn't unmounted during API load
      if (!isMounted) return;

      playerRef.current = new window.YT.Player(iframeId, {
        events: {
          onReady: (event: any) => {
            // Browser compliance: Video must start muted to autoplay
            event.target.mute();
            event.target.playVideo();

            // If the parent state was already 'unmuted' before the player was ready,
            // we sync it here after a tiny delay
            if (!isMuted) {
              event.target.unMute();
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
    <div className="absolute inset-0 bg-black animate-fadeIn overflow-hidden rounded-[10.92px]">
      {/* Invisible overlay to capture clicks for the toggle */}
      <div className="absolute inset-0 z-40 cursor-pointer" onClick={onToggleMute} />

      <button
        type="button"
        onClick={onToggleMute}
        className="absolute bottom-3 right-3 z-50 flex size-13 items-center justify-center rounded-full bg-black/60 text-white border border-white/20 hover:scale-110 transition-all active:scale-95"
      >
        {isMuted ? (
          <VolumeX className="cursor-pointer" size={23} />
        ) : (
          <Volume2 className="cursor-pointer" size={23} />
        )}
      </button>

      <div className="w-full h-full pointer-events-none scale-[1.35]">
        <iframe
          id={iframeId}
          className="w-full h-full object-cover"
          src={`https://www.youtube.com/embed/${videoKey}?enablejsapi=1&autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&loop=1&playlist=${videoKey}`}
          allow="autoplay; encrypted-media"
          title={`${title} Trailer`}
        />
      </div>
    </div>
  );
};
