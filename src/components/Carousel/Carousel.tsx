"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import { Genre } from "@/types/genre";
import { Logo, MoviesWithLogos } from "@/types/global";
import { MediaMode } from "@/types/mediaMode";
import fetchData from "@/utils/fetchData";
import mapGenres from "@/utils/mapGenre";

interface Props {
	mediaMode: MediaMode;
}

type GenreResponse = {
	genres: Genre[];
};

type TrendingMediaResponse = {
	results: MoviesWithLogos[];
};

type ImageResponse = {
	logos: Logo[];
};

export default function Carousel({ mediaMode }: Props) {
	const [trendingMovies, setTrendingMovies] = useState<MoviesWithLogos[]>([]);
	const [genres, setGenres] = useState<Record<number, string>>({});
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	useEffect(() => {
		const fetchGenres = async () => {
			try {
				const { genres } = await fetchData<GenreResponse>("3", `genre/${mediaMode}/list`);
				setGenres(mapGenres(genres));
			} catch (error) {
				console.error("Error fetching genres:", error);
			}
		};
		fetchGenres();
	}, [mediaMode]);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const { results: trendingMedia } = await fetchData<TrendingMediaResponse>(
					"3",
					`trending/${mediaMode}/day`
				);

				const moviesWithLogos: MoviesWithLogos[] = await Promise.all(
					trendingMedia.slice(0, 5).map(async (movie) => {
						const movieDetails = await fetchData<ImageResponse>(
							"3",
							`${mediaMode}/${movie.id}/images`
						);
						const logoImage = movieDetails.logos.find((logo) => logo.iso_639_1 === "en");

						return {
							...movie,
							logoImage: logoImage
								? `https://image.tmdb.org/t/p/w300${logoImage.file_path}`
								: undefined,
						};
					})
				);

				setTrendingMovies(moviesWithLogos);
			} catch (error) {
				console.error("Error fetching trending movies:", error);
			}
		};
		fetchMovies();
	}, [mediaMode]);

	const handlePrev = () => {
		setCurrentIndex((prevIndex) => (prevIndex === 0 ? trendingMovies.length - 1 : prevIndex - 1));
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex === trendingMovies.length - 1 ? 0 : prevIndex + 1));
	};

	const getGenreNames = (movie: MoviesWithLogos): string => {
		return movie.genre_ids?.map((id) => genres[id] || "Unknown").join(", ") ?? "";
	};

	return (
		<div className='relative h-[clamp(33rem,45vw,50rem)] w-full overflow-hidden flex justify-center items-center'>
			<button
				onClick={handlePrev}
				aria-label='Previous slide'
				className='absolute top-[92%] right-20 z-20 bg-[#9e221a] text-gray-300 font-medium h-10 w-10 rounded-full flex justify-center items-center'>
				&lt;
			</button>

			<ul
				className='flex w-full h-full transition-transform duration-500 ease-in-out'
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}
				key={mediaMode}>
				{trendingMovies.map((movie, index) => (
					<li
						key={movie.id}
						className='flex-shrink-0 flex w-full h-full items-center justify-evenly flex-row'
						data-active={index === currentIndex ? true : undefined}>
						{/* Info (desktop only) */}
						<div className='hidden xl:flex flex-col justify-center items-center flex-[2] text-white h-full border-[0.5rem] border-[#100f10] gap-8'>
							{movie.logoImage && (
								<div className='relative h-[clamp(10rem,14vw,17rem)] w-[clamp(14rem,17vw,33rem)]'>
									<Image
										src={movie.logoImage}
										fill
										quality={50}
										alt={`${movie.title || movie.name} logo`}
										className='object-contain object-center drop-shadow'
									/>
								</div>
							)}
							<p className='text-[#515256] text-xl'>{getGenreNames(movie)}</p>
						</div>

						{/* Backdrop */}
						<div className='relative flex-[4] h-full w-full'>
							<Image
								src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
								fill
								alt={movie.title || movie.name || "Media"}
								className='object-cover object-center brightness-[80%] rounded-none xl:rounded-2xl'
								priority={index === 0}
							/>

							{/* Fade overlay */}
							<div className='absolute top-0 w-full h-full bg-gradient-to-t xl:bg-gradient-to-r from-[#100f10] to-transparent mt-[clamp(5rem,7.5vw,10rem)] xl:mt-0 xl:ml-[-0.1rem] flex justify-start items-center'>
								<div className='flex flex-col gap-8 px-8 xl:hidden'>
									{movie.logoImage && (
										<div className='relative h-[clamp(10rem,14vw,17rem)] w-[clamp(14rem,17vw,33rem)]'>
											<Image
												src={movie.logoImage}
												fill
												quality={60}
												alt={`${movie.title || movie.name} logo`}
												className='object-contain object-center'
											/>
										</div>
									)}
									<p className='text-base leading-snug line-clamp-2 text-white w-[clamp(27rem,50vw,37rem)]'>
										{movie.overview}
									</p>
									<Link href={`/${mediaMode}/${movie.id}`}>
										<button className='bg-[#9e221a] text-white rounded-2xl px-6 py-2 text-base'>
											More Details
										</button>
									</Link>
								</div>
							</div>
						</div>
					</li>
				))}
			</ul>

			<button
				onClick={handleNext}
				aria-label='Next slide'
				className='absolute top-[92%] right-6 z-20 bg-[#9e221a] text-gray-300 font-medium h-10 w-10 rounded-full flex justify-center items-center'>
				&gt;
			</button>
		</div>
	);
}
