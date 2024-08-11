import Image from "next/image";
import styles from "./MediaOverview.module.css";
import fetchData from "@/utils/fetchData";
import { dateConverter } from "@/utils/dateConverter";
import RatingIcon from "../RatingIcon/RatingIcon";
import { displayRuntime } from "@/utils/displayRuntime";
import CastContainer from "../Cast/CastContainer";
import GoBack from "../GoBack/GoBack";
import SimilarMedia from "../SimilarMedia/SimilarMedia";
import Icons from "@/utils/icons";
import Link from "next/link";
import MediaCard from "../MediaCard/MediaCard";

export default async function MediaOverview({ params, mediaMode }) {
	const [mediaDetails, { cast }] = await Promise.all([
		fetchData(3, `/${mediaMode}/${params.slug}`),
		fetchData(3, `/${mediaMode}/${params.slug}/credits`),
	]);

	const {
		backdrop_path,
		poster_path,
		title,
		name,
		release_date,
		first_air_date,
		media_type,
		genres = [],
		number_of_seasons,
		number_of_episodes,
		runtime,
		episode_run_time,
		overview,
		vote_average,
	} = mediaDetails;

	const mediaTitle = title || name;
	const releaseDate = release_date || first_air_date;
	const mediaSrc = backdrop_path
		? `https://image.tmdb.org/t/p/original${backdrop_path}`
		: `https://image.tmdb.org/t/p/original${poster_path}`;

	const renderSeasonEpisodeInfo = number_of_seasons && number_of_episodes && (
		<div className={styles.mediaMetadata}>
			<div>{`${number_of_seasons} Seasons`}</div>
			<div>{`${number_of_episodes} Episodes`}</div>
		</div>
	);

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
						<MediaCard media={{ backdrop_path, poster_path }} mediaMode={media_type} />
					</div>
					<div className={styles.stat}>
						<p className={styles.date}>{releaseDate ? dateConverter(releaseDate) : "----"}</p>
						<p>{displayRuntime({ episode_run_time, runtime })}</p>
						<RatingIcon vote={vote_average} />
					</div>

					<div className={styles.genreList}>
						{genres.map((genre) => (
							<Link key={genre.id} href={`/genre/${genre.id}`}>
								<p>{genre.name}</p>
							</Link>
						))}
					</div>

					{renderSeasonEpisodeInfo}

					<p className={styles.description}>{overview}</p>
					<div className={styles.watchBtn}>
						<i>{Icons.filmPlay}</i>
						<p>Watch Now</p>
					</div>
				</div>
			</div>
			<CastContainer castList={cast.slice(0, 10)} />
			<SimilarMedia mediaMode={mediaMode} params={params} />
		</div>
	);
}
