'use client';

import React, { useEffect, useState } from 'react';

import CustomSliderButtons from '@/components/Media/CustomSlider/CustomSliderButtons';

interface SliderProps {
  title: string;
  totalItems: number;
  children: React.ReactNode;
}

export default function Slider({ title, totalItems, children }: SliderProps) {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [itemsPerScreen, setItemsPerScreen] = useState<number | null>(null);

  useEffect(() => {
    const updateItemsPerScreen = () => {
      const width = window.innerWidth;
      if (width <= 500) setItemsPerScreen(2);
      else if (width <= 768) setItemsPerScreen(3);
      else if (width <= 1000) setItemsPerScreen(4);
      else setItemsPerScreen(5);
    };

    updateItemsPerScreen();
    window.addEventListener('resize', updateItemsPerScreen);
    return () => window.removeEventListener('resize', updateItemsPerScreen);
  }, []);

  if (!itemsPerScreen) return null;

  const maxIndex = Math.max(0, totalItems - itemsPerScreen);

  const handleScroll = (direction: 'left' | 'right') => {
    setSliderIndex((prev) => {
      if (direction === 'left') return Math.max(prev - itemsPerScreen, 0);
      return Math.min(prev + itemsPerScreen, maxIndex);
    });
  };

  const translatePercent = sliderIndex * (100 / totalItems);

  return (
    <div className="relative z-1 mb-[28px] flex w-full flex-col gap-[18px] text-white">
      <div className="flex items-center justify-between">
        <h2 className="slider-title">{title}</h2>
        <div className="flex items-center gap-2.5 rounded-[12px] border border-[#262626] bg-[#0F0F0F] px-4 py-2">
          <CustomSliderButtons
            direction="left"
            onClick={() => handleScroll('left')}
            disabled={sliderIndex === 0}
          />
          <CustomSliderButtons
            direction="right"
            onClick={() => handleScroll('right')}
            disabled={sliderIndex >= maxIndex}
          />
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div
          className="flex gap-5 transition-transform duration-300 ease-in-out"
          style={{
            width: `${(100 / itemsPerScreen) * totalItems}%`,
            transform: `translateX(-${translatePercent}%)`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
