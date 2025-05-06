"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import CustomSliderButtons from "./CustomSliderButtons";
import { Media } from "@/types/global";
import { MediaMode } from "@/types/mediaMode";
import { ROUTES } from "@/constants/route";
import { getImageUrl } from "@/utils/getImageUrl";

interface Props {
	media: Media[];
	title: string;
	mediaMode: MediaMode;
}

export default function CustomSliderClient({ media, title, mediaMode }: Props) {
	const sliderRef = useRef<HTMLDivElement>(null);
	const [sliderIndex, setSliderIndex] = useState(0);
	const [itemsPerScreen, setItemsPerScreen] = useState(4);
	const itemGap = 16;

	const totalItems = media.length;

	const maxIndex = useMemo(
		() => Math.max(0, totalItems - itemsPerScreen),
		[totalItems, itemsPerScreen]
	);

	const updateItemsPerScreen = useCallback(() => {
		const width = window.innerWidth;

		const breakpoints = [
			{ max: 360, value: 2 },
			{ max: 640, value: 3 },
			{ max: 768, value: 4 },
			{ max: 1280, value: 5 },
			{ max: 1580, value: 6 },
		];

		const matched = breakpoints.find((bp) => width <= bp.max);
		const newItemsPerScreen = matched?.value || 8;

		setItemsPerScreen((prev) => {
			if (prev !== newItemsPerScreen) {
				setSliderIndex((prevIndex) =>
					Math.min(prevIndex, Math.max(0, totalItems - newItemsPerScreen))
				);
			}
			return newItemsPerScreen;
		});
	}, [totalItems]);

	useEffect(() => {
		updateItemsPerScreen();
		window.addEventListener("resize", updateItemsPerScreen);
		return () => window.removeEventListener("resize", updateItemsPerScreen);
	}, [updateItemsPerScreen]);

	const handleClick = (direction: "left" | "right") => {
		setSliderIndex((prev) => {
			const nextIndex =
				direction === "left"
					? Math.max(prev - itemsPerScreen, 0)
					: Math.min(prev + itemsPerScreen, maxIndex);
			return nextIndex;
		});
	};

	return (
		<div className='flex flex-col w-full mb-10 text-white gap-[18px]'>
			{/* Header */}
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

			{/* Slider */}
			<div className='relative w-full overflow-hidden'>
				<div
					ref={sliderRef}
					className='flex transition-transform duration-300 ease-in-out'
					style={{
						transform: `translateX(-${(sliderIndex * 100) / itemsPerScreen}%)`,
					}}>
					{media.map((item, i) => {
						const isLast = i === media.length - 1;
						const widthStyle = `calc(${100 / itemsPerScreen}% - ${itemGap}px)`;
						const marginRight = isLast ? "0" : `${itemGap}px`;

						return (
							<Link
								href={ROUTES.MOVIE(item.id, item.name || item.title)}
								key={item.id}
								style={{
									width: widthStyle,
									marginRight,
									flex: "0 0 auto",
								}}>
								<div className='relative aspect-[2/3] w-full shrink-0 rounded-[15.92px] overflow-hidden'>
									<Image
										src={getImageUrl(item.poster_path, "poster", "w500")}
										alt={item.title || item.name || "Movie Poster"}
										fill
										quality={90}
										className='object-cover rounded-[11px]'
									/>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
}
