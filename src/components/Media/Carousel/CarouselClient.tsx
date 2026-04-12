'use client';
import { useState, ReactNode, useCallback } from 'react';

import CarouselControls from './CarouselControls';

interface Props {
  children: ReactNode;
  itemCount: number;
}

export default function CarouselClient({ children, itemCount }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? itemCount - 1 : prev - 1));
  }, [itemCount]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === itemCount - 1 ? 0 : prev + 1));
  }, [itemCount]);

  return (
    <div className="flex-center relative m-[24px] h-[500px] overflow-hidden rounded-[32px] sm:m-0 sm:h-[700px] sm:rounded-none md:h-[calc(100vh-87px)]">
      <ul
        className="flex h-full w-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {children}
      </ul>
      <CarouselControls onPrev={handlePrev} onNext={handleNext} />
    </div>
  );
}
