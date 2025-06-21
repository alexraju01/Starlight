"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import { Movie, TVShow } from "@/types/global";
import { MediaMode } from "@/types/mediaMode";
import { SearchMedia } from "@/types/searchMedia";

interface Props {
	media: Movie | TVShow | SearchMedia;
	mediaMode: MediaMode;
	className?: string;
}

const MediaCard = ({ media, mediaMode, className }: Props) => {
	const [isLoaded, setIsLoaded] = useState(false);

	const { id, name, title, poster_path } = media;
	const displayName = title || name;

	useEffect(() => {
		if (!poster_path) setIsLoaded(true);
	}, [poster_path]);

	return (
		// <Link href={`/${mediaMode}/${id}`}>
		<div
			className={`
					relative w-full h-full overflow-hidden 
					transition-all duration-300 ease-in-out 
					filter brightness-[80%] hover:brightness-[105%] 
					hover:scale-110 ${className}
				`}>
			{!isLoaded && (
				<div className='absolute top-0 left-0 w-full h-full bg-slate-700 animate-[pulse_1.5s_ease-in-out_infinite] rounded-md z-[1]' />
			)}
			{/* <div className="relative w-full h-[400px]"> */}

			<Image
				className={` w-full h-auto
					transition-opacity duration-300 ease-in-out 
					${isLoaded ? "opacity-100" : "opacity-0"} 
					relative z-[2] rounded-xl shadow-md
					`}
				src={
					poster_path
						? `https://image.tmdb.org/t/p/w342${poster_path}`
						: `https://image.tmdb.org/t/p/w342/`
				}
				width={70}
				height={105}
				// fill
				// layout='responsive'
				alt={displayName ?? "Image poster"}
				priority
				onLoad={() => setIsLoaded(true)}
			/>
			{/* </div> */}
		</div>
	);
};

export default MediaCard;
