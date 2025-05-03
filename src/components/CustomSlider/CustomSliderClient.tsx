"use client";

import { useState } from "react";
import SliderItem from "./SliderItem";
import SliderControl from "./SliderControl";
import { Media } from "@/types/global";
import Link from "next/link";
import useWindowWidth from "@/app/hooks.useWindowWidth";
// import useWindowWidth from "@/hooks/useWindowWidth";

interface Props {
	media: Media[];
	title: string;
}

const GAP = 25;

const CustomSliderClient = ({ media, title }: Props) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const width = useWindowWidth();

	if (width === null) return null; // or a loading spinner

	let ITEM_WIDTH = 240;
	if (width < 768) {
		ITEM_WIDTH = 160;
	} else if (width < 1024) {
		ITEM_WIDTH = 214;
	}

	const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
	const handleNext = () => setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));

	return (
		<section className='relative z-2 flex flex-col gap-[18px] lg:gap-[22px] 2xl:gap-[52px] mb-[28px]'>
			<div className='flex justify-between items-center'>
				<h2 className='leading-[150%] text-[22.63px] lg:text-[29.28px] 2xl:text-[44px] font-normal font-Helvetica'>
					{title}
				</h2>
				<SliderControl onPrev={handlePrev} onNext={handleNext} />
			</div>

			<div className='relative w-full overflow-hidden'>
				<div
					className='flex transition-transform duration-500 ease-in-out'
					style={{
						gap: `${GAP}px`,
						transform: `translateX(-${currentIndex * (ITEM_WIDTH + GAP)}px)`,
					}}>
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
