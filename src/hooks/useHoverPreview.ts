import { useEffect, useRef, useState } from 'react';

import { MediaMode } from '@/types/mediaMode';
import { getVideoKey } from '@/utils/serverActions/getVideoKey';

/** Hover this long before the trailer starts, so brushing past a card doesn't load video. */
const PREVIEW_DELAY_MS = 400;
/** Matches the card's 300ms grow/shrink transition. */
const SHRINK_DURATION_MS = 300;

/**
 * Mouse-hover trailer preview for a media card (desktop only – touch taps open the title):
 *
 * - after a short hover, fetches the trailer key (once) and starts the preview
 * - pins the card's slot at its resting height while it's enlarged, so the row – and on
 *   the last row the page height and scroll position – doesn't jump; a jump could pull the
 *   card out from under the cursor and make the hover flicker on and off
 * - previews start muted; leaving resets sound and stops the preview
 */
export function useHoverPreview(mediaMode: MediaMode, id: number) {
  const [isPreviewing, setIsPreviewing] = useState(false);
  // The backdrop is only fetched once the card has been hovered, then kept so it can fade
  // out again on leave.
  const [hasHovered, setHasHovered] = useState(false);
  const [videoKey, setVideoKey] = useState<string | null>(null);
  // Unexpected audio on hover is a poor experience.
  const [isMuted, setIsMuted] = useState(true);

  const slotRef = useRef<HTMLDivElement>(null);
  const videoKeyRef = useRef<string | null>(null);
  const previewTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const unlockTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Don't let a pending timer fire after the card is gone.
  useEffect(
    () => () => {
      clearTimeout(previewTimeoutRef.current);
      clearTimeout(unlockTimeoutRef.current);
    },
    [],
  );

  const loadVideo = async () => {
    if (videoKeyRef.current) return;
    const key = await getVideoKey(mediaMode as MediaMode.MOVIE | MediaMode.TV, id);
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
    // Release the pin once the card has shrunk back.
    unlockTimeoutRef.current = setTimeout(() => {
      if (slotRef.current) slotRef.current.style.height = '';
    }, SHRINK_DURATION_MS);
    setIsPreviewing(false);
    setIsMuted(true);
  };

  const toggleMute = (e: React.MouseEvent) => {
    // The mute control sits on the artwork – don't let the click open the title.
    e.preventDefault();
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  return {
    slotRef,
    hoverHandlers: { onPointerEnter, onPointerLeave },
    hasHovered,
    /** A trailer is ready to play for the current hover. */
    showTrailer: isPreviewing && videoKey !== null,
    videoKey,
    isMuted,
    toggleMute,
  };
}
