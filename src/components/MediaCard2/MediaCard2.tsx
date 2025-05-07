import Image from "next/image";
import Link from "next/link";
import { Media } from "@/types/global";
import { isGenreMovie, isMovie, isTVShow } from "@/utils/typeGuard";
import { getImageUrl } from "@/utils/getImageUrl";
import { ROUTES } from "@/constants/route";
import { MediaMode } from "@/types/mediaMode";
import { Layers } from "lucide-react";
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
