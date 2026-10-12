'use client';

import { Loader2, Play, X } from 'lucide-react';
import { useEffect, useRef, useState, useTransition } from 'react';

import { buttonClass } from '@/components/ui/buttonStyles';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { getVideoKey } from '@/utils/serverActions/getVideoKey';

interface Props {
  mediaMode: 'movie' | 'tv';
  id: number;
  title: string;
}

/** "Watch Trailer" button that plays the YouTube trailer in a modal. */
export default function TrailerButton({ mediaMode, id, title }: Props) {
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isUnavailable, setIsUnavailable] = useState(false);
  const [isPending, startTransition] = useTransition();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef, isOpen);

  const open = () => {
    if (videoKey) return setIsOpen(true);

    startTransition(async () => {
      const key = await getVideoKey(mediaMode, id);
      if (key) {
        setVideoKey(key);
        setIsOpen(true);
      } else {
        setIsUnavailable(true);
      }
    });
  };

  const close = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  // While open: Escape closes, the page behind doesn't scroll, focus starts on "Close".
  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={open}
        disabled={isPending || isUnavailable}
        aria-busy={isPending}
        className={buttonClass(
          'primary',
          null,
          'h-[52px] gap-[10px] px-[28px] text-[16px] shadow-[0_8px_24px_rgba(158,34,26,0.35)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none',
        )}
      >
        {isPending ? (
          <Loader2 aria-hidden="true" className="size-[20px] animate-spin" />
        ) : (
          <Play aria-hidden="true" className="size-[18px] fill-current" />
        )}
        {isUnavailable ? 'No trailer available' : 'Watch Trailer'}
      </button>

      {isOpen && videoKey && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} trailer`}
          className="animate-in fade-in fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-[16px] backdrop-blur-sm duration-200 sm:p-[32px]"
          onClick={close}
        >
          <div className="relative w-full max-w-[1120px]" onClick={(e) => e.stopPropagation()}>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close trailer"
              className="absolute -top-[52px] right-0 flex size-[40px] items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X aria-hidden="true" className="size-[20px]" />
            </button>
            <div className="aspect-video w-full overflow-hidden rounded-[12px] bg-black shadow-[0_24px_80px_rgba(0,0,0,0.8)]">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={`${title} trailer`}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                className="size-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
