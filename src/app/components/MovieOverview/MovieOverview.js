import { fetchData } from "@/app/utils/fetchData";
import Image from "next/image";
import styles from "./MovieOverview.module.css";
import CastContainer from "./components/CastContainer/CastContainer";
import { dateConverter } from "@/app/utils/dateConverter";
import Icons from "@/app/utils/icons";

export default async function MovieOverview({ params }) {
	const [movieDetails, casts] = await Promise.all([
		fetchData(3, `/movie/${params.slug}`),
		fetchData(3, `/movie/${params.slug}/credits`),
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
					// quality={100}
					src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
				/>
			</div>
			{/* {logoImages.map((logo, index) => (
				<p key={index}>{logo.title[0].file_path}</p>
			))} */}
			{/* "aspect_ratio": 1.58,
      "height": 162,
      "iso_639_1": "en",
      "file_path": "/pNKObrZ3IfDhe0HeZmsoJehY3gL.png",
      "vote_average": 0,
      "vote_count": 0,
      "width": 256 */}
			{/* <img src={`https://image.tmdb.org/t/p/original/pNKObrZ3IfDhe0HeZmsoJehY3gL.png`} />;
			<img src={`https://image.tmdb.org/t/p/original/1ZNSdWFnlTWzcpZYKZYOPEhpWir.png`} />; */}
			<div className={styles.Introduction}>
				<h1 className={styles.title}>{movieDetails.title}</h1>
				<div className={styles.blurBox}>
					<div className={styles.posterContainer}>
						<Image
							fill
							alt="jhsdggh"
							// quality={100}
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
						{/* <div className={styles.rating}>
						<i>{Icons.star}</i>
						<p>{movieDetails.vote_average.toFixed(1)}</p>
					</div> */}
					</div>

					<div className={styles.genreList}>
						{movieDetails.genres.map((genre, index) => (
							<p key={index}>{genre.name}</p>
						))}
					</div>
					<p className={styles.description}>{movieDetails.overview}</p>
					<div className={styles.watchBtn}>Watch Now</div>
				</div>

				{/* <CastContainer castList={casts} /> */}
			</div>
		</div>
	);
}
