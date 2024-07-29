// import fetchData from "@/app/utils/fetchData";
import Image from "next/image";
import styles from "./MediaOverview.module.css";
import fetchData from "@/utils/fetchData";
import { dateConverter } from "@/utils/dateConverter";

export default async function MediaOverview({ params, mediaMode }) {
	const [movieDetails, casts] = await Promise.all([
		fetchData(3, `/${mediaMode}/${params.slug}`),
		fetchData(3, `/${mediaMode}/${params.slug}/credits`),
		// fetchData(3, `/movie/${params.slug}/images`),
	]);

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
				<h1 className={styles.title}>{movieDetails.title}</h1>
				<div className={styles.blurBox}>
					<div className={styles.posterContainer}>
						<Image
							fill
							alt="jhsdggh"
							src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
						/>
					</div>
					<div className={styles.stat}>
						<p className={styles.date}>{dateConverter(movieDetails.release_date)}</p>
						<p>{movieDetails.runtime} mins</p>
						<div className={styles.rating}>
							<p className={styles.icon}>IMDb</p>
							<p className={styles.rate}>{movieDetails.vote_average.toFixed(1)}</p>
						</div>
					</div>

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
