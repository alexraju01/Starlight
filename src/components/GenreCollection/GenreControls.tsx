"use client";

import { useRef } from "react";
import GenreSlider from "./GenreSlider";
import { GenreWithMovies } from "@/types/genre";
import SliderControl from "../CustomSlider/SliderControl";
// import SliderControl from "./SliderControl";

interface Props {
	genreMovies: GenreWithMovies[];
}

export default function GenreControls({ genreMovies }: Props) {
	const prevRef = useRef<HTMLButtonElement>(null);
	const nextRef = useRef<HTMLButtonElement>(null);

	const handlePrev = () => prevRef.current?.click();
	const handleNext = () => nextRef.current?.click();

	return (
		<div className='flex flex-col gap-10'>
			<div className='flex justify-between items-center'>
				<h2 className='text-[44px] font-medium font-Helvetica flex items-center gap-4'>
					Our Genres
				</h2>

				<SliderControl onPrev={handlePrev} onNext={handleNext} />
			</div>

			{/* Visually hidden buttons to satisfy slider API */}
			<div className='sr-only' aria-hidden='true'>
				<button ref={prevRef} aria-label='Previous genre slide' />
				<button ref={nextRef} aria-label='Next genre slide' />
			</div>

			<GenreSlider genreMovies={genreMovies} prevRef={prevRef} nextRef={nextRef} />
		</div>
	);
}
