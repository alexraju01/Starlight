"use client";
import SliderItem from "./SliderItem";
import SliderControl from "./SliderControl";
import { useState } from "react";
import { Media, Movie } from "@/types/global";
import Link from "next/link";

interface Props {
  media: Media[];
  title: string;
}

const ITEM_WIDTH = 240;

const CustomSliderClient = ({ media, title }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));

  return (
    <section className="relative z-2 flex flex-col gap-[57px] lg:mx-[101px]">
      <div className="flex justify-between ">
        <h2 className="text-[44px] font-medium font-Helvetica">{title}</h2>
        <SliderControl onPrev={handlePrev} onNext={handleNext} />
      </div>

      {/* Slider wrapper that hides overflow and scrollbar */}
      <div className="relative w-full  overflow-hidden">
        <div
          className="flex gap-[25px] transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (ITEM_WIDTH + 25)}px)`,
          }}
        >
          {media.map((media: Media, index) => (
            <Link key={media.id} href={`/movie/${media.id}`}>
              <SliderItem media={media} isActive={index === currentIndex} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomSliderClient;
