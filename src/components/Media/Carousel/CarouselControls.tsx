'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { memo } from 'react';

interface Props {
  onPrev: () => void;
  onNext: () => void;
}

const ARROW =
  'flex size-[48px] items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-secondary lg:size-[56px]';

/** Previous / next arrows, bottom-right of the hero on the page gutter. */
const CarouselControls = memo(function CarouselControls({ onPrev, onNext }: Props) {
  return (
    <div className="absolute right-[24px] bottom-[8px] z-[2] flex gap-[10px] md:bottom-[48px] lg:right-[68px] 2xl:right-[101px]">
      <button type="button" aria-label="Previous slide" onClick={onPrev} className={ARROW}>
        <ArrowLeft aria-hidden="true" className="size-[20px]" />
      </button>
      <button type="button" aria-label="Next slide" onClick={onNext} className={ARROW}>
        <ArrowRight aria-hidden="true" className="size-[20px]" />
      </button>
    </div>
  );
});

export default CarouselControls;
