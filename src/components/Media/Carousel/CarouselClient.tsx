'use client';
import { useState, ReactNode } from 'react';

import CarouselControls from './CarouselControls';

interface Props {
  children: ReactNode;
  itemCount: number;
}

export default function CarouselClient({ children, itemCount }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => setCurrentIndex((p) => (p === 0 ? itemCount - 1 : p - 1));
  const handleNext = () => setCurrentIndex((p) => (p === itemCount - 1 ? 0 : p + 1));

  return (
    <div className="relative overflow-hidden flex justify-center items-center sm:h-[700px] h-[500px] md:h-[calc(100vh-87px)] rounded-[32px] m-[24px] sm:m-0 sm:rounded-none">
      <ul
        className="flex w-full h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {/* We pass the active state down via a simple prop if needed, 
            but for images, we can also use CSS or simple prop-logic */}
        {children}
      </ul>
      <CarouselControls onPrev={handlePrev} onNext={handleNext} />
    </div>
  );
}
