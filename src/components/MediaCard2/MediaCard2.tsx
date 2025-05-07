import Image from "next/image";
import Link from "next/link";
import { Media } from "@/types/global";
import { isGenreMovie, isMovie, isTVShow } from "@/utils/typeGuard";
import { getImageUrl } from "@/utils/getImageUrl";
import { ROUTES } from "@/constants/route";
import { MediaMode } from "@/types/mediaMode";
import { Layers, Star } from "lucide-react";
import { HiRectangleStack } from "react-icons/hi2";

interface Props {
	item: Media;
	genreMap: Record<number, string>;
	width: string;
	marginRight: string;
	mediaMode: MediaMode;
}

export default function MediaCard2({ item, genreMap, width, marginRight, mediaMode }: Props) {
	const title = item.name || item.title;
	const dateStr = isMovie(item) ? item.release_date : isTVShow(item) ? item.first_air_date : null;

	const formattedDate = dateStr
		? new Date(dateStr).toLocaleDateString("en-US", {
				month: "short",
				year: "numeric",
		  })
		: "Unknown";

	const genreList =
		isGenreMovie(item) && item.genre_ids
			? item.genre_ids
					.map((id) => (genreMap[id] === "Science Fiction" ? "Sci-Fi" : genreMap[id]))
					.filter(Boolean)
					.join(", ")
			: "Unknown genre";

	return (
		<Link
			href={ROUTES.MEDIA(mediaMode, item.id, item.name || item.title)}
			style={{ width, marginRight, flex: "0 0 auto" }}>
			<div className='w-full px-[15px] pt-[15px] rounded-[10.92px] bg-card-bg border border-solid border-card-stroke'>
				<div className='relative aspect-[0.7] w-full overflow-hidden'>
					<Image
						src={getImageUrl(item.poster_path, "poster", "w500")}
						alt={title || "Movie Poster"}
						fill
						quality={90}
						className='object-cover rounded-[10.93px]'
					/>
				</div>

				<div className='flex flex-col gap-3 py-5 truncate '>
					<div className='flex justify-between'>
						<h3 className='text-2xl text-white font-medium  truncate'>{title}</h3>
						<div className='flex items-center gap-2'>
							<i>
								<Star fill='#FACC15' color='#FACC15' size={20} />
							</i>
							<p className='text-2xl'>{item.vote_average}</p>
						</div>
					</div>
					<div className='flex gap-3.5 text-gray-400 text-xl'>
						<p>{formattedDate}</p>
						<p>|</p>
						<p className='truncate'>{genreList}</p>
					</div>
					{isTVShow(item) && item.number_of_seasons && (
						<div className='flex truncate text-lg '>
							<div className='flex gap-[4px]  items-center text-gray-400 text-xl bg-[#141414]  py-[6px] pl-[6px] pr-[10px] rounded-[51px] border-[1px] border-solid border-[#262626]'>
								<i>
									<HiRectangleStack size={18} />
								</i>
								<p className='font-md'>
									{item.number_of_seasons} Season{item.number_of_seasons !== 1 ? "s" : ""}
								</p>
							</div>
						</div>
					)}
				</div>
				{/* )} */}

				{/* {mediaMode === "tv" && isTVShow(item) && item.number_of_seasons && (
					<div className='flex py-5 truncate text-lg '>
						<div className='flex gap-[4px]  items-center text-gray-400 text-[16px] bg-[#141414]  py-[6px] pl-[6px] pr-[10px] rounded-[51px] border-[1px] border-solid border-[#262626]'>
							<i>
								<svg
									width='25'
									height='24'
									viewBox='0 0 25 24'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										d='M5.89975 4.65724C6.27685 4.55472 6.67364 4.5 7.0832 4.5H17.5832C17.9928 4.5 18.3896 4.55472 18.7667 4.65724C18.274 3.67454 17.2574 3 16.0832 3H8.5832C7.40905 3 6.39244 3.67454 5.89975 4.65724Z'
										fill='#999999'
									/>
									<path
										d='M2.58334 12C2.58334 10.3431 3.92649 9 5.58334 9H19.0833C20.7402 9 22.0833 10.3431 22.0833 12V18C22.0833 19.6569 20.7402 21 19.0833 21H5.58334C3.92649 21 2.58334 19.6569 2.58334 18V12Z'
										fill='#999999'
									/>
									<path
										d='M5.5832 7.5C5.17364 7.5 4.77685 7.55472 4.39975 7.65724C4.89244 6.67454 5.90905 6 7.0832 6H17.5832C18.7574 6 19.774 6.67454 20.2667 7.65724C19.8896 7.55472 19.4928 7.5 19.0832 7.5H5.5832Z'
										fill='#999999'
									/>
								</svg>
							</i>
							<p className='font-md'>
								{item.number_of_seasons} Season{item.number_of_seasons !== 1 ? "s" : ""}
							</p>
						</div>
					</div>
				)} */}
			</div>
		</Link>
	);
}
