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
    <div className="relative overflow-hidden flex justify-center items-center sm:h-[700px] h-[500px] md:h-[calc(100vh-87px)] rounded-[32px] m-[24px] sm:m-0 sm:rounded-none">
      <ul
        className="flex w-full h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {children}
      </ul>
      <CarouselControls onPrev={handlePrev} onNext={handleNext} />
    </div>
  );
}
