import { MoviesWithLogos } from "@/types/global";
import { dateConverter } from "@/utils/date";
import { capitalize } from "@/utils/string";
import clsx from "clsx";
import Link from "next/link";

interface Props {
	movie: MoviesWithLogos;
	genres: Record<string, string>;
	isMobile: Boolean;
}

export default function MediaMeta({ movie, genres, isMobile }: Props) {
	console.log(isMobile);
	return (
		<div
			className={clsx(
				"flex gap-y-2 gap-x-4 text-white font-normal mb-8 text-[clamp(1.6rem,2vw,2rem)]",
				isMobile ? "flex-row  flex-wrap" : ""
			)}>
			{/* Release Date */}
			<p className='whitespace-nowrap'>{dateConverter(movie.release_date)}</p>

			{/* Divider Dot for Desktop */}
			<span className='hidden sm:inline-block'>•</span>

			{/* Media Type */}
			<p className='whitespace-nowrap capitalize'>{capitalize(movie.media_type)}</p>

			{/* Divider Dot for Desktop */}
			<span className='hidden sm:inline-block'>•</span>

			{/* Genres */}
			<div className='flex flex-wrap gap-x-2 gap-y-1'>
				{(movie.genre_ids ?? []).map((id, index, arr) => {
					const genre = genres[id] || "Unknown";
					const isLast = index === arr.length - 1;

					return (
						<Link href={`/genre/${id}`} key={id} className='transition-colors duration-200'>
							<p className='hover:text-[#9E221A] focus:text-[#9E221A] outline-none cursor-pointer'>
								{genre}
								{/* Add dot between genres only on larger screens */}
								{!isLast && <span className='hidden sm:inline'> •</span>}
							</p>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
