// import fetchData from "@/app/utils/fetchData";
import Image from "next/image";
import styles from "./MediaOverview.module.css";
import fetchData from "@/utils/fetchData";
import { dateConverter } from "@/utils/dateConverter";
import RatingIcon from "../RatingIcon/RatingIcon";
import { displayRuntime } from "@/utils/displayRuntime";
import CastContainer from "../Cast/CastContainer";
import GoBack from "../GoBack/GoBack";
import SimilarMedia from "../SimilarMedia/SimilarMedia";
import Slider from "../Slider/Slider";
import Icons from "@/utils/icons";

export default async function MediaOverview({ params, mediaMode }) {
	const [mediaDetails, casts] = await Promise.all([
		fetchData(3, `/${mediaMode}/${params.slug}`),
		fetchData(3, `/${mediaMode}/${params.slug}/credits`),
	]);

	return (
		<div className={styles.container}>
			<div className={styles.imgContainer}>
				<Image
					className={styles.movieBackground}
					fill
					alt="jhsdggh"
					src={
						mediaDetails.backdrop_path
							? `https://image.tmdb.org/t/p/original${mediaDetails.backdrop_path}`
							: `https://image.tmdb.org/t/p/original${mediaDetails.poster_path}`
					}
				/>
			</div>
			<GoBack />
			<div className={styles.Introduction}>
				<h1 className={styles.title}>{mediaDetails.title || mediaDetails.name}</h1>
				<div className={styles.blurBox}>
					<div className={styles.posterContainer}>
						<Image
							fill
							alt="jhsdggh"
							src={`https://image.tmdb.org/t/p/original${mediaDetails.poster_path}`}
						/>
					</div>
					<div className={styles.stat}>
						<p className={styles.date}>
							{dateConverter(mediaDetails.release_date || mediaDetails.first_air_date)}
						</p>
						<p>{displayRuntime(mediaDetails)} </p>

						<RatingIcon mediaDetails={mediaDetails} />
					</div>

					{/*  ========= genre ========= */}
					<div className={styles.genreList}>
						{mediaDetails.genres.map((genre, index) => (
							<p key={index}>{genre.name}</p>
						))}
					</div>

					{mediaDetails.number_of_seasons && mediaDetails.number_of_episodes ? (
						<div className={styles.mediaMetadata}>
							<div>{`${mediaDetails.number_of_seasons} Seasons`}</div>
							<div>{`${mediaDetails.number_of_episodes} Episodes`}</div>
						</div>
					) : null}

					<p className={styles.description}>{mediaDetails.overview}</p>
					<div className={styles.watchBtn}>
						<i>{Icons.filmPlay}</i>
						<p>Watch Now</p>
					</div>
				</div>
			</div>
			<CastContainer castList={casts.cast.slice(0, 10)} />
			<SimilarMedia mediaMode={mediaMode} params={params} />
		</div>
	);
}
