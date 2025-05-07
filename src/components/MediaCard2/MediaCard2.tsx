import Link from "next/link";
import { Media } from "@/types/global";
import { ROUTES } from "@/constants/route";
import { MediaMode } from "@/types/mediaMode";
import { formatDate } from "@/utils/formatDate";
import PosterImage from "./PosterImage";
import RatingBadge from "./RatingBadge";
import SeasonBadge from "./SeasonBadge";
import { formatGenres } from "@/utils/formatGenre";

interface Props {
	item: Media;
	genreMap: Record<number, string>;
	mediaMode: MediaMode;
	style?: React.CSSProperties;
}

export default function MediaCard2({ item, genreMap, mediaMode, style }: Props) {
	const title = item.name || item.title;
	const dateStr = formatDate(item);
	const genreText = formatGenres(item, genreMap);

	return (
		<Link href={ROUTES.MEDIA(mediaMode, item.id, title)} style={{ ...style, flex: "0 0 auto" }}>
			<div className='w-full px-[15px] pt-[15px] rounded-[10.92px] bg-card-bg border border-solid border-card-stroke'>
				<PosterImage src={item.poster_path} alt={title || "Movie Poster"} />
				<div className='flex flex-col gap-3 py-5 truncate'>
					<div className='flex justify-between'>
						<h3 className='text-2xl text-white font-medium truncate'>{title}</h3>
						<RatingBadge rating={item.vote_average} />
					</div>
					<div className='flex gap-3.5 text-gray-400 text-xl'>
						<p>{dateStr}</p>
						<p>|</p>
						<p className='truncate'>{genreText}</p>
					</div>
					<SeasonBadge item={item} />
				</div>
			</div>
		</Link>
	);
}
