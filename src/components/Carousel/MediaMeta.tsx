import { MoviesWithLogos } from "@/types/global";
import { dateConverter } from "@/utils/date";
import { capitalize } from "@/utils/string";

interface Props {
	movie: MoviesWithLogos;
	genres: Record<string, string>;
}

export default function MediaMeta({ movie, genres }: Props) {
	return (
		<div className='flex  gap-3.5  mb-8 text-white text-[20px] font-normal'>
			<p>{dateConverter(movie.release_date)}</p>
			{"•"}
			{/* <span className="h-[25px] w-[1px] bg-white"></span> */}
			<p>{capitalize(movie.media_type)}</p>
			{/* <span className="h-[25px] w-[1px] bg-white"></span> */}
			{"•"}
			<div className='flex gap-3.5 '>
				{(movie.genre_ids?.map((id) => genres[id] || "Unknown") ?? []).map((genre, index, arr) => (
					<p key={index} className='hover:text-[#9E221A] hover:cursor-pointer'>
						{genre}
						{index < arr.length - 1 && " •"}
					</p>
				))}
			</div>
		</div>
	);
}
