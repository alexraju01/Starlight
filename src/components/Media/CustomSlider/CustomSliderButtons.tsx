'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

type SliderButtonProps = {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled?: boolean;
};

/** Round previous / next button for row sliders. */
function CustomSliderButtons({ direction, onClick, disabled = false }: SliderButtonProps) {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      aria-label={direction === 'left' ? 'Previous items' : 'Next items'}
      onClick={onClick}
      disabled={disabled}
      className="flex size-[40px] items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white transition-colors hover:border-white/30 hover:bg-white/15 disabled:cursor-default disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:bg-white/[0.06] lg:size-[44px]"
    >
      <Icon aria-hidden="true" className="size-[20px]" />
    </button>
  );
}

export default CustomSliderButtons;
