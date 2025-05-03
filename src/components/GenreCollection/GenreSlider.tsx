"use client";

import { useEffect, RefObject } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import Link from "next/link";
import { GenreWithMovies } from "@/types/genre";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w185";

interface GenreSliderProps {
	genreMovies: GenreWithMovies[];
	prevRef: RefObject<HTMLButtonElement>;
	nextRef: RefObject<HTMLButtonElement>;
}

export default function GenreSlider({ genreMovies, prevRef, nextRef }: GenreSliderProps) {
	useEffect(() => {
		// optional: handle side effects after mount if needed
	}, []);

	return (
		<div className='relative w-full '>
			<Swiper
				modules={[Navigation]}
				spaceBetween={24}
				slidesPerView={1}
				onInit={(swiper) => {
					if (typeof swiper.params.navigation === "object" && swiper.params.navigation !== null) {
						swiper.params.navigation.prevEl = prevRef.current;
						swiper.params.navigation.nextEl = nextRef.current;
					}
					swiper.navigation.init();
					swiper.navigation.update();
				}}
				breakpoints={{
					0: { slidesPerView: 2 },
					640: { slidesPerView: 3 },
					1024: { slidesPerView: 4 },
					1440: { slidesPerView: 5 },
				}}
				className='py-6'>
				{genreMovies.map((genre) => (
					<SwiperSlide key={genre.id}>
						<Link href={`/genre/${genre.id}`}>
							<div className='w-full max-w-[300px] flex-shrink-0 rounded-[13.75px] border-[1.15px] border-solid  border-[#262626] bg-[#1A1A1A] px-[17px] pt-[17px] pb-[6px] xl:px-[34.39px] xl:pt-[34px] xl:pb-[12px] flex flex-col gap-4 cursor-pointer transition hover:bg-[#E500000F] hover:border-[#E50000]'>
								<div className='relative grid grid-cols-2 gap-[5px]'>
									<div className='absolute bottom-0 left-0 w-full h-full rounded-[9px] bg-amber-500 z-[1000000] genre-gradient'></div>

									{genre.movies.map((movie) => (
										<div key={movie.id} className='relative w-full aspect-[0.8] z-10'>
											<Image
												src={`${IMAGE_BASE_URL}${movie.poster_path}`}
												alt={movie.title || "Movie"}
												fill
												className='object-cover rounded-[11px]'
											/>
										</div>
									))}
								</div>
								<h3 className='text-white  text-[14px] leading xl:text-[22px] leading-[150%] font-medium font-Helvetica flex items-center justify-between'>
									{genre.name}
									<svg
										width='21'
										height='19'
										viewBox='0 0 25 23'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											d='M1.56702 11.7297L23.0582 11.7297M23.0582 11.7297L13.3872 2.05872M23.0582 11.7297L13.3872 21.4008'
											stroke='white'
											strokeWidth='2.29239'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</h3>
							</div>
						</Link>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
