import { useEffect, useRef, useState } from 'react';

import { MediaMode } from '@/types/mediaMode';
import { getVideoKey } from '@/utils/serverActions/getVideoKey';

/** Brushing past a card shouldn't load a video. */
const PREVIEW_DELAY_MS = 400;
/** The card's grow/shrink transition. */
const SHRINK_DURATION_MS = 300;

/**
 * Mouse-hover trailer preview for a media card (touch taps just open the title). Starts
 * muted after a short hover. While enlarged, the slot is pinned at its resting height so
 * the page can't reflow and pull the card out from under the cursor.
 */
export function useHoverPreview(mediaMode: MediaMode, id: number) {
  const [isPreviewing, setIsPreviewing] = useState(false);
  // Gates the backdrop download; stays true so it can fade out again on leave.
  const [hasHovered, setHasHovered] = useState(false);
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const slotRef = useRef<HTMLDivElement>(null);
  const videoKeyRef = useRef<string | null>(null);
  const previewTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const unlockTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(
    () => () => {
      clearTimeout(previewTimeoutRef.current);
      clearTimeout(unlockTimeoutRef.current);
    },
    [],
  );

  const loadVideo = async () => {
    if (videoKeyRef.current) return;
    const key = await getVideoKey(mediaMode, id);
    if (key) {
      videoKeyRef.current = key;
      setVideoKey(key);
    }
  };

  const onPointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;

    clearTimeout(unlockTimeoutRef.current);
    const slot = slotRef.current;
    if (slot && !slot.style.height) slot.style.height = `${slot.offsetHeight}px`;

    setHasHovered(true);
    previewTimeoutRef.current = setTimeout(() => {
      setIsPreviewing(true);
      void loadVideo();
    }, PREVIEW_DELAY_MS);
  };

  const onPointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;

    clearTimeout(previewTimeoutRef.current);
    unlockTimeoutRef.current = setTimeout(() => {
      if (slotRef.current) slotRef.current.style.height = '';
    }, SHRINK_DURATION_MS);
    setIsPreviewing(false);
    setIsMuted(true);
  };

  const toggleMute = (e: React.MouseEvent) => {
    // The mute control sits on the artwork link.
    e.preventDefault();
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  return {
    slotRef,
    hoverHandlers: { onPointerEnter, onPointerLeave },
    hasHovered,
    showTrailer: isPreviewing && videoKey !== null,
    videoKey,
    isMuted,
    toggleMute,
  };
}
