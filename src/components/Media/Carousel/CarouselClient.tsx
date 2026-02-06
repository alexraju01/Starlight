'use client';

import { useState } from 'react';

import { MoviesWithLogos } from '@/types/global';

import CarouselControls from './CarouselControls';
import CarouselItem from './CarouselItem';

interface Props {
  movies: MoviesWithLogos[];
  genres: Record<number, string>;
}

export default function CarouselClient({ movies, genres }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  const handleNext = () => setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));

  return (
    <div className="relative overflow-hidden flex justify-center items-center  sm:h-[700px] sm:rounded-none sm:m-0 h-[500px] md:md:h-[calc(100vh-87px)] rounded-[32px] m-[24px]">
      <ul
        className=" flex w-full h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {movies.map((movie, index) => (
          <CarouselItem
            key={movie.id}
            movie={movie}
            genres={genres}
            isActive={index === currentIndex}
          />
        ))}
      </ul>
      <CarouselControls onPrev={handlePrev} onNext={handleNext} />
    </div>
  );
}
