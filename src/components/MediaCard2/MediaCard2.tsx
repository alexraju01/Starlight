import Link from "next/link";
import { Media } from "@/types/global";
import { ROUTES } from "@/constants/route";
import { MediaMode } from "@/types/mediaMode";
import PosterImage from "./PosterImage";
import RatingBadge from "./RatingBadge";
import SeasonBadge from "./SeasonBadge";
import { formatGenres } from "@/utils/genre";
import { formatDate } from "@/utils/date";
import { isMovie, isTVShow } from "@/utils/typeGuard";

interface Props {
	item: Media;
	genreMap: Record<number, string>;
	mediaMode: MediaMode;
	style?: React.CSSProperties;
}

const MediaCard2 = ({ item, genreMap, mediaMode, style }: Props) => {
	const title = item.name || item.title;
	const dateStr = formatDate(item);
	const genreText = formatGenres(item, genreMap);

	const getMediaDate = (item: Media): string => {
		if (isMovie(item)) return item.release_date;
		if (isTVShow(item)) return item.first_air_date;
		return "";
	};

	const isUpcoming = (() => {
		const releaseDate = new Date(getMediaDate(item));
		return releaseDate > new Date();
	})();

	const hasValidRating = typeof item.vote_average === "number" && item.vote_average > 0;

	return (
		<Link href={ROUTES.MEDIA(mediaMode, item.id, title)} style={{ ...style, flex: "0 0 auto" }}>
			<div className='w-full px-[15px] pt-[15px] rounded-[10.92px] bg-card-bg border border-solid border-card-stroke'>
				<figure className='relative aspect-[0.7] w-full overflow-hidden'>
					<PosterImage src={item.poster_path} alt={title || "Movie Poster"} />
					{isUpcoming && (
						<figcaption className='absolute top-2 right-2 bg-[#9E221A] text-white text-lg font-Helvetica font-semibold px-4 py-2 rounded-[7px]'>
							Upcoming
						</figcaption>
					)}
				</figure>
				<div className='flex flex-col gap-3 py-5 truncate'>
					<div className='flex justify-between'>
						<h3 className='text-2xl text-white font-medium truncate'>{title}</h3>
						{hasValidRating && <RatingBadge rating={item.vote_average} />}
					</div>
					<div className='flex gap-3.5 text-gray-400 text-xl'>
						<time dateTime={getMediaDate(item)}>{dateStr}</time>
						<p>|</p>
						<p className='truncate'>{genreText}</p>
					</div>
					<SeasonBadge item={item} />
				</div>
			</div>
		</Link>
	);
};

export default MediaCard2;
