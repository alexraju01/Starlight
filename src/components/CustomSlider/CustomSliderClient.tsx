"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import CustomSliderButtons from "./CustomSliderButtons";
import { Media } from "@/types/global";
import { MediaMode } from "@/types/mediaMode";
import { ROUTES } from "@/constants/route";
import { getImageUrl } from "@/utils/getImageUrl";
import { isGenreMovie, isMovie, isTVShow } from "@/utils/typeGuard";
import getGenre from "@/utils/getGenre";

interface Props {
	media: Media[];
	title: string;
	mediaMode: MediaMode;
}

export default function CustomSliderClient({ media, title, mediaMode }: Props) {
	console.log(media);
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
				const genreMap: Record<number, string> = {};
				genres.forEach((genre: { id: number; name: string }) => {
					genreMap[genre.id] = genre.name;
				});
				setGenres(genreMap);
			} catch (error) {
				console.error("Error fetching genres:", error);
			}
		};

		fetchGenres();
	}, [mediaMode]);

	const updateItemsPerScreen = useCallback(() => {
		const width = window.innerWidth;

		const breakpoints = [
			{ max: 360, value: 2 },
			{ max: 640, value: 2 },
			{ max: 768, value: 3 },
			{ max: 1280, value: 3 },
			{ max: 1580, value: 5 },
		];

		const matched = breakpoints.find((bp) => width <= bp.max);
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
			<div className='flex justify-between items-center '>
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
								<div className='w-full px-[15px]  pt-[15px] rounded-[10.92px] bg-card-bg border-solid border-[0.91px]  border-card-stroke'>
									<div className='relative aspect-[0.7] w-full  overflow-hidden'>
										<Image
											src={getImageUrl(item.poster_path, "poster", "w500")}
											alt={item.title || item.name || "Movie Poster"}
											fill
											quality={90}
											className='object-cover rounded-[10.93px]'
										/>
									</div>
									<div className='flex flex-col gap-2 my-[8.5px]'>
										<div className='flex justify-between'>
											<h3 className='text-2xl text-white 2xl:text-2xl font-medium font-Helvetica truncate'>
												{item.name || item.title}
											</h3>

											<div className='flex gap-2  items-center'>
												<i>
													<svg
														className='size-7'
														width='20'
														height='19'
														viewBox='0 0 20 19'
														fill='none'
														xmlns='http://www.w3.org/2000/svg'>
														<path
															d='M18.6233 6.6796L12.9205 5.85078L10.3712 0.682528C10.3016 0.541024 10.187 0.426473 10.0455 0.356844C9.69064 0.181649 9.25939 0.327645 9.08195 0.682528L6.53263 5.85078L0.829801 6.6796C0.672574 6.70206 0.528824 6.77618 0.418765 6.88849C0.280236 7.03087 0.212286 7.20137 0.214917 7.40001C0.217548 7.59866 0.28999 7.7673 0.432241 7.90596L4.55832 11.9287L3.58351 17.609C3.56019 17.7439 3.57427 17.8747 3.62572 18.0013C3.67718 18.1281 3.75824 18.2316 3.86893 18.3121C3.9796 18.3925 4.10315 18.4375 4.2396 18.4473C4.37603 18.457 4.50473 18.4299 4.6257 18.366L9.72658 15.6842L14.8275 18.366C14.9668 18.4402 15.1285 18.4648 15.2834 18.4379C15.6743 18.3705 15.9371 17.9999 15.8696 17.609L14.8949 11.9287L19.0209 7.90596C19.1332 7.79591 19.2074 7.65216 19.2298 7.49493C19.2905 7.10187 19.0165 6.738 18.6233 6.6796Z'
															fill='#FACC15'
														/>
													</svg>
												</i>
												<p className='text-2xl leading-6'>{item.vote_average}</p>
											</div>
										</div>
										<div className='flex gap-3.5 '>
											<p className='text-xl '>
												{(() => {
													const dateStr = isMovie(item)
														? item?.release_date
														: isTVShow(item)
														? item?.first_air_date
														: null;

													if (!dateStr) return "Unknown";

													const date = new Date(dateStr);
													return date.toLocaleDateString("en-US", {
														month: "short",
														year: "numeric",
													});
												})()}
											</p>
											<p>|</p>
											<p className=' text-xl truncate'>
												{isGenreMovie(item) && item.genre_ids
													? item.genre_ids
															.map((id) => {
																const name = genres[id];
																return name === "Science Fiction" ? "Sci-Fi" : name;
															})
															.filter(Boolean)
															.join(", ")
													: "Unknown genre"}
											</p>
										</div>
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
}
