"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import SliderButton from "./CustomSliderButtons";
import { Media } from "@/types/global";
import CustomSliderButtons from "./CustomSliderButtons";

interface Props {
	media: Media[];
	title: string;
}

export default function CustomSliderClient({ media, title }: Props) {
	const sliderRef = useRef<HTMLDivElement>(null);
	const [sliderIndex, setSliderIndex] = useState(0);
	const [itemsPerScreen, setItemsPerScreen] = useState(4);
	const itemGap = 16;

	// Adjust itemsPerScreen based on screen width
	const updateItemsPerScreen = () => {
		const width = window.innerWidth;
		let newItemsPerScreen = 4;

		if (width <= 360) newItemsPerScreen = 2;
		else if (width <= 640) newItemsPerScreen = 3;
		else if (width <= 768) newItemsPerScreen = 4;
		else if (width <= 1280) newItemsPerScreen = 5;
		else if (width <= 1580) newItemsPerScreen = 6;
		else newItemsPerScreen = 8;

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
		window.addEventListener("resize", updateItemsPerScreen);
		return () => window.removeEventListener("resize", updateItemsPerScreen);
	}, []);

	const totalItems = media?.length;
	const maxIndex = Math.max(0, totalItems - itemsPerScreen);

	const handleClick = (direction: "left" | "right") => {
		setSliderIndex((prev) => {
			if (direction === "left") return Math.max(prev - itemsPerScreen, 0);
			return Math.min(prev + itemsPerScreen, maxIndex);
		});
	};

	// Calculate how much to translate based on items
	const itemWidthPercent = 100 / totalItems;
	const translatePercent = sliderIndex * itemWidthPercent;

	return (
		<div className=' flex flex-col w-full mb-10  text-white gap-[18px]'>
			{/* Header with title, buttons and progress bar */}

			<div className='flex justify-between items-center '>
				<h2 className='slider-title'>{title}</h2>
				<div className='flex z-[20] gap-2.5 px-4 py-2'>
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

			{/* Slider row */}
			<div className='relative w-full overflow-hidden '>
				<div
					ref={sliderRef}
					className='flex  transition-transform duration-300 ease-in-out'
					style={{
						transform: `translateX(-${sliderIndex * (100 / itemsPerScreen)}%)`,
					}}>
					{media?.map((item, i) => (
						<Link
							href={`/movie/${item.id}`}
							key={item.id}
							className='...'
							style={{
								width: `calc(${100 / itemsPerScreen}% - ${itemGap}px)`,
								marginRight: i !== media.length - 1 ? `${itemGap}px` : "0", // no gap on last item
								flex: "0 0 auto",
							}}>
							<div
								key={item.id}
								className='relative aspect-[2/3] w-full shrink-0 rounded-[15.92px] overflow-hidden'>
								<Image
									src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
									alt={item.title || item.name || "Movie Poster"}
									fill
									quality={90}
									className='object-cover rounded-[11px]'
								/>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}

// export default SliderClient;
