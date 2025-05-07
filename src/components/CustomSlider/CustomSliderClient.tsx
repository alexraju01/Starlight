// CustomSliderClient.tsx
"use client";

import React, { useMemo, useRef, useState } from "react";
import CustomSliderButtons from "./CustomSliderButtons";
import { Media } from "@/types/global";
import { MediaMode } from "@/types/mediaMode";
import MediaCard2 from "../MediaCard2/MediaCard2";
import { useResponsiveItems } from "@/hooks/useResponsiveItems";
import { useGenres } from "@/hooks/useGenre";
// import { useGenres } from "@/hooks/useGenres";

interface Props {
	media: Media[];
	title: string;
	mediaMode: MediaMode;
}

const GAP = 16;

export default function CustomSliderClient({ media, title, mediaMode }: Props) {
	const sliderRef = useRef<HTMLDivElement>(null);
	const totalItems = media.length;
	const itemsPerScreen = useResponsiveItems(totalItems);
	const genres = useGenres(mediaMode);
	const [sliderIndex, setSliderIndex] = useState(0);

	const maxIndex = useMemo(
		() => Math.max(0, totalItems - itemsPerScreen),
		[totalItems, itemsPerScreen]
	);

	const handleClick = (direction: "left" | "right") => {
		setSliderIndex((prev) =>
			direction === "left"
				? Math.max(prev - itemsPerScreen, 0)
				: Math.min(prev + itemsPerScreen, maxIndex)
		);
	};

	return (
		<div className='flex flex-col w-full mb-10 text-white gap-[18px]'>
			<div className='flex justify-between items-center'>
				<h2 className='slider-title'>{title}</h2>
				<div className='flex z-20 gap-2.5 px-4 py-2'>
					<CustomSliderButtons
						direction='left'
						onClick={() => handleClick("left")}
						disabled={sliderIndex === 0}
					/>
					<CustomSliderButtons
						direction='right'
						onClick={() => handleClick("right")}
						disabled={sliderIndex >= maxIndex}
					/>
				</div>
			</div>

			<div className='relative w-full overflow-hidden'>
				<div
					ref={sliderRef}
					className='flex transition-transform duration-300 ease-in-out'
					style={{
						transform: `translateX(-${(sliderIndex * 100) / itemsPerScreen}%)`,
					}}>
					{media.map((item, i) => {
						const isLast = i === media.length - 1;
						const widthStyle = `calc(${100 / itemsPerScreen}% - ${GAP}px)`;
						const marginRight = isLast ? "0" : `${GAP}px`;

						return (
							<MediaCard2
								key={item.id}
								item={item}
								genreMap={genres}
								width={widthStyle}
								marginRight={marginRight}
								mediaMode={mediaMode}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
