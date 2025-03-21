import Image from "next/image";
import Link from "next/link";
import styles from "./MediaOverview.module.css";
import fetchData from "../../utils/fetchData";
import { dateConverter } from "../../utils/dateConverter";
import { displayRuntime } from "../../utils/displayRuntime";
import RatingIcon from "../RatingIcon/RatingIcon";
import CastContainer from "../Cast/CastContainer";
import GoBack from "../GoBack/GoBack";
import SimilarMedia from "./SimilarMedia/SimilarMedia";
import Icons from "../../utils/icons";
import MediaCard from "../MediaCard/MediaCard";
import SeasonEpisodeInfo from "./SeasonEpisodeInfo/SeasonEpisodeInfo";
import Button from "../Button/Button";
import Seasons from "./Seasons/Seasons";
import { Genre } from "@/types/genre";
import { MediaMode } from "@/types/mediaMode";
import { CastMember } from "@/types/cast";
import { Movie, TVSeries, Media } from "@/types/global";

// Type definition for component props
interface Props {
	params: string;
	mediaMode: MediaMode.TV | MediaMode.Movie;
}

// Utility type guards
function isMovie(media: Media): media is Movie {
	return (media as Movie).media_type === "movie";
}

function isTVSeries(media: Media): media is TVSeries {
	return (media as TVSeries).media_type === "tv";
}

// Fetch media details and credits in a reusable fnction
// Fetch media details and credits in a reusable function
async function fetchMediaData(params: string, mediaMode: MediaMode.TV | MediaMode.Movie) {
	try {
		const [mediaDetails, credits] = await Promise.all([
			fetchData<Media>("3", `/${mediaMode}/${params}`),
			fetchData<{ cast: CastMember[] }>("3", `/${mediaMode}/${params}/credits`),
		]);

		// ✅ Dynamically add media_type based on mediaMode
		if (mediaDetails) {
			mediaDetails.media_type = mediaMode;
		}

		return { mediaDetails, credits };
	} catch (error) {
		console.error("Error fetching media data:", error);
		return { mediaDetails: null, credits: { cast: [] } }; // Handle errors gracefully
	}
}

export default async function MediaOverview({ params, mediaMode }: Props) {
	const { mediaDetails, credits } = await fetchMediaData(params, mediaMode);
	if (!mediaDetails) {
		return <div className={styles.error}>Error loading media details.</div>;
	}

	// Destructure shared properties
	const { backdrop_path, poster_path, overview, vote_average, genres } = mediaDetails;

	// Determine type-specific fields
	const mediaTitle = isMovie(mediaDetails) ? mediaDetails.title : mediaDetails.name;
	const releaseDate = isMovie(mediaDetails)
		? mediaDetails.release_date
		: mediaDetails.first_air_date;

	const mediaSrc = backdrop_path
		? `https://image.tmdb.org/t/p/original${backdrop_path}`
		: poster_path
		? `https://image.tmdb.org/t/p/w342${poster_path}`
		: "/placeholder.jpg";

	return (
		<div className={styles.container}>
			<div className={styles.imgContainer}>
				<Image className={styles.movieBackground} fill alt={mediaTitle} src={mediaSrc} />
			</div>

			<GoBack />

			<div className={styles.Introduction}>
				<h1 className={styles.title}>{mediaTitle}</h1>
				<div className={styles.blurBox}>
					<div className={styles.posterContainer}>
						<MediaCard media={mediaDetails} mediaMode={mediaMode} />
					</div>

					<div className={styles.stat}>
						<p className={styles.date}>{releaseDate ? dateConverter(releaseDate) : "----"}</p>

						<p>{displayRuntime(mediaDetails)}</p>
						<RatingIcon vote={vote_average} />
					</div>

					<div className={styles.genreList}>
						{genres.map((genre: Genre) => (
							<Link key={genre.id} href={`/genre/${genre.id}`}>
								<p>{genre.name}</p>
							</Link>
						))}
					</div>

					{isTVSeries(mediaDetails) && (
						<SeasonEpisodeInfo
							metaData={{
								number_of_seasons: mediaDetails.number_of_seasons,
								number_of_episodes: mediaDetails.number_of_episodes,
							}}
						/>
					)}

					<p className={styles.description}>{overview}</p>
					<Button icon={Icons.play}>Watch Now</Button>
				</div>
			</div>

			{isTVSeries(mediaDetails) && <Seasons seasons={mediaDetails.seasons} />}
			<CastContainer castList={credits.cast.slice(0, 10)} />
			<SimilarMedia mediaMode={mediaMode} params={params} />
		</div>
	);
}
