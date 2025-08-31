'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import CustomSliderButtons from '@/components/Media/CustomSlider/CustomSliderButtons';
import { ROUTES } from '@/constants/route';
import { GenreWithMovies } from '@/types/genre';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w185';

interface Props {
  genreMovies: GenreWithMovies[];
}

export default function GenreCollectionClient({ genreMovies }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [itemsPerScreen, setItemsPerScreen] = useState(4);

  // Adjust itemsPerScreen based on screen width
  const updateItemsPerScreen = () => {
    const width = window.innerWidth;
    let newItemsPerScreen = 4;

    if (width <= 500) newItemsPerScreen = 2;
    else if (width <= 768) newItemsPerScreen = 3;
    else if (width <= 1000) newItemsPerScreen = 4;
    else newItemsPerScreen = 5;

    setItemsPerScreen((prev) => {
      if (prev !== newItemsPerScreen) {
        const maxIndex = Math.max(0, totalItems - newItemsPerScreen);
        setSliderIndex((prevIndex) => Math.min(prevIndex, maxIndex));
      }
      return newItemsPerScreen;
    });
  };

  useEffect(() => {
    updateItemsPerScreen();
    window.addEventListener('resize', updateItemsPerScreen);
    return () => window.removeEventListener('resize', updateItemsPerScreen);
  });

  const totalItems = genreMovies?.length;
  const maxIndex = Math.max(0, totalItems - itemsPerScreen);

  const handleClick = (direction: 'left' | 'right') => {
    setSliderIndex((prev) => {
      if (direction === 'left') return Math.max(prev - itemsPerScreen, 0);
      return Math.min(prev + itemsPerScreen, maxIndex);
    });
  };

  // Calculate how much to translate based on items
  const itemWidthPercent = 100 / totalItems;
  const translatePercent = sliderIndex * itemWidthPercent;

  return (
    <div className=" flex flex-col w-full  text-white gap-[18px]">
      {/* Header with title, buttons and progress bar */}

      <div className="flex justify-between items-center">
        <h2 className="slider-title">Our Genres</h2>
        <div className="flex items-center gap-2.5 px-4 py-2">
          <CustomSliderButtons
            direction="left"
            onClick={() => handleClick('left')}
            disabled={sliderIndex === 0}
          />
          <CustomSliderButtons
            direction="right"
            onClick={() => handleClick('right')}
            disabled={sliderIndex >= maxIndex}
          />
        </div>
      </div>

      {/* Slider row */}
      <div className="relative w-full overflow-hidden ">
        <div
          ref={sliderRef}
          className="flex gap-5 transition-transform duration-300 ease-in-out"
          style={{
            width: `${(100 / itemsPerScreen) * totalItems}%`,
            transform: `translateX(-${translatePercent}%)`,
          }}
        >
          {genreMovies?.map((genre) => (
            <Link
              href={ROUTES.GENRE(genre.id)}
              key={genre.id}
              className=" rounded-[13.75px] border-[1.15px] border-solid  border-[#262626] bg-[#1A1A1A] px-[17px] pt-[17px] pb-[6px] xl:px-[34.39px] xl:pt-[34px] xl:pb-[12px] flex flex-col gap-4 cursor-pointer transition hover:bg-[#E500000F] hover:border-[#E50000]"
              style={{
                width: `${100 / totalItems}%`,
              }}
            >
              <div className="relative grid grid-cols-2 gap-[7px]">
                <div className="absolute bottom-0 left-0 w-full h-full rounded-[9px] bg-amber-500 z-[1000000] genre-gradient"></div>

                {genre?.movies?.map((movie) => (
                  <div key={movie.id} className="relative w-full aspect-[0.8] z-10">
                    <Image
                      src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                      alt={movie.title || 'Movie'}
                      fill
                      className="object-cover rounded-[11px]"
                    />
                  </div>
                ))}
              </div>
              <h3 className="text-white  text-[14px] leading xl:text-[22px] leading-[150%] font-medium font-Helvetica flex items-center justify-between">
                {genre.name}
                <svg
                  width="21"
                  height="19"
                  viewBox="0 0 25 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.56702 11.7297L23.0582 11.7297M23.0582 11.7297L13.3872 2.05872M23.0582 11.7297L13.3872 21.4008"
                    stroke="white"
                    strokeWidth="2.29239"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
