'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface CarouselContextType {
  isAnyVideoPlaying: boolean;
  setIsAnyVideoPlaying: (val: boolean) => void;
}

const CarouselContext = createContext<CarouselContextType | undefined>(undefined);

export function CarouselProvider({ children }: { children: ReactNode }) {
  const [isAnyVideoPlaying, setIsAnyVideoPlaying] = useState(false);

  // Memoize value to avoid re-rendering consumers unless state actually changes
  const value = useMemo(
    () => ({
      isAnyVideoPlaying,
      setIsAnyVideoPlaying,
    }),
    [isAnyVideoPlaying],
  );

  return <CarouselContext.Provider value={value}>{children}</CarouselContext.Provider>;
}

export function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a CarouselProvider');
  }
  return context;
}
