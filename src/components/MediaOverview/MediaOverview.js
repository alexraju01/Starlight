// import fetchData from "@/app/utils/fetchData";
import Image from "next/image";
import styles from "./MediaOverview.module.css";
import fetchData from "@/utils/fetchData";
import { dateConverter } from "@/utils/dateConverter";

export default async function MediaOverview({ params, mediaMode }) {
	const movieDetails = await fetchData(3, `/${mediaMode}/${params.slug}`);
	const movieRuntime = movieDetails.runtime ? `${movieDetails.runtime} mins` : null;
	const episodeRuntime =
		Array.isArray(movieDetails.episode_run_time) && movieDetails.episode_run_time.length > 0
			? `${movieDetails.episode_run_time[0]} MPE `
			: null;

	const displayRuntime = movieRuntime || episodeRuntime || "N/A";

	return (
		<div className={styles.container}>
			<div className={styles.imgContainer}>
				<Image
					className={styles.movieBackground}
					fill
					alt="jhsdggh"
					priority={true}
					src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
				/>
			</div>

			<div className={styles.Introduction}>
				<h1 className={styles.title}>{movieDetails.title || movieDetails.name}</h1>
				<div className={styles.blurBox}>
					<div className={styles.posterContainer}>
						<Image
							fill
							alt="jhsdggh"
							src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
						/>
					</div>
					<div className={styles.stat}>
						<p className={styles.date}>
							{dateConverter(movieDetails.release_date || movieDetails.first_air_date)}
						</p>
						<p>{displayRuntime} </p>
						<div className={styles.rating}>
							<p className={styles.icon}>IMDb</p>
							<p className={styles.rate}>{movieDetails.vote_average.toFixed(1)}</p>
						</div>
					</div>

					{/*  ========= genre ========= */}
					<div className={styles.genreList}>
						{movieDetails.genres.map((genre, index) => (
							<p key={index}>{genre.name}</p>
						))}
					</div>

					<p className={styles.description}>{movieDetails.overview}</p>
					<div className={styles.watchBtn}>Watch Now</div>
				</div>
			</div>
		</div>
	);
}
