'use client';

import CustomSliderButtons from '@/components/Media/CustomSlider/CustomSliderButtons';
import { GENRE_COLLECTION_BREAKPOINTS } from '@/constants/breakpoints';
import { useResponsiveItems } from '@/hooks/useResponsiveItems';
import { useSliderPaging } from '@/hooks/useSliderPaging';

interface SliderProps {
  title: string;
  totalItems: number;
  children: React.ReactNode;
}

export default function Slider({ title, totalItems, children }: SliderProps) {
  const itemsPerScreen = useResponsiveItems(GENRE_COLLECTION_BREAKPOINTS);
  const slider = useSliderPaging(totalItems, itemsPerScreen);

  if (!itemsPerScreen) return null;

  return (
    <div className="relative z-1 mb-[28px] flex w-full flex-col gap-[18px] text-white">
      <div className="flex items-center justify-between">
        <h2 className="slider-title">{title}</h2>
        <div className="flex items-center gap-2.5 rounded-[12px] border border-[#262626] bg-[#0F0F0F] px-4 py-2">
          <CustomSliderButtons
            direction="left"
            onClick={slider.prev}
            disabled={!slider.canGoPrev}
          />
          <CustomSliderButtons
            direction="right"
            onClick={slider.next}
            disabled={!slider.canGoNext}
          />
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* The track is as wide as all cards; each card is 1/totalItems of it. */}
        <div
          className="flex gap-5 transition-transform duration-300 ease-in-out"
          style={{
            width: `${(100 / itemsPerScreen) * totalItems}%`,
            transform: `translateX(-${slider.index * (100 / totalItems)}%)`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
