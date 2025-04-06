import { Media } from "@/types/global";
import Image from "next/image";
import React from "react";

interface Props {
  media: Media;
  isActive: boolean;
}

const SliderItem = ({ media, isActive }: Props) => {
  return (
    <div
      key={media.id}
      className="relative w-[240px] h-[322.7542419433594]  shrink-0 rounded-[15.92px] overflow-hidden"
    >
      <Image
        src={`https://image.tmdb.org/t/p/w780${media.poster_path}`}
        alt={media.title || media.name || "Movie Poster"}
        fill
        className="object-cover rounded-[11px]"
        priority={isActive}
      />
    </div>
  );
};

export default SliderItem;
