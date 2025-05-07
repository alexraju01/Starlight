"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CustomSliderButtons from "./CustomSliderButtons";
import { Media } from "@/types/global";
import { MediaMode } from "@/types/mediaMode";
import getGenre from "@/utils/getGenre";
import MediaCard2 from "../MediaCard2/MediaCard2";

interface Props {
	media: Media[];
	title: string;
	mediaMode: MediaMode;
}

const BREAKPOINTS = [
	{ max: 360, value: 2 },
	{ max: 640, value: 2 },
	{ max: 768, value: 3 },
	{ max: 1280, value: 3 },
	{ max: 1580, value: 5 },
];

export default function CustomSliderClient({ media, title, mediaMode }: Props) {
	const sliderRef = useRef<HTMLDivElement>(null);
	const [sliderIndex, setSliderIndex] = useState(0);
	const [itemsPerScreen, setItemsPerScreen] = useState(4);
	const [genres, setGenres] = useState<Record<number, string>>({});
	const itemGap = 16;

	const totalItems = media.length;

	const maxIndex = useMemo(
		() => Math.max(0, totalItems - itemsPerScreen),
		[totalItems, itemsPerScreen]
	);

	useEffect(() => {
		const fetchGenres = async () => {
			try {
				const { genres } = await getGenre(mediaMode);
				setGenres(Object.fromEntries(genres.map(({ id, name }) => [id, name])));
			} catch (error) {
				console.error("Error fetching genres:", error);
			}
		};

		fetchGenres();
	}, [mediaMode]);

	const updateItemsPerScreen = useCallback(() => {
		const width = window.innerWidth;
		const matched = BREAKPOINTS.find((bp) => width <= bp.max);
		const newItemsPerScreen = matched?.value || 6;

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
						const widthStyle = `calc(${100 / itemsPerScreen}% - ${itemGap}px)`;
						const marginRight = isLast ? "0" : `${itemGap}px`;

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
