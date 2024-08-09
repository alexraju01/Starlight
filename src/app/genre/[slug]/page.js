import MediaCard from "@/components/MediaCard/MediaCard";
import styles from "./genreMediaList.module.css";
import fetchData from "@/utils/fetchData";
import { Suspense } from "react";

export default async function Page({ params }) {
	const [movieGenre, tvGenre, genreRelatedMovies, genreRelatedTv] = await Promise.all([
		fetchData(3, "genre/movie/list"),
		fetchData(3, "genre/tv/list"),
		fetchData(3, `discover/movie?with_genres=${params.slug}`),
		fetchData(3, `discover/tv?with_genres=${params.slug}`),
	]);

	const combineRelatedMedia = [
		...genreRelatedMovies.results.map((media) => ({ ...media, type: "movie" })),
		...genreRelatedTv.results.map((media) => ({ ...media, type: "tv" })),
	];

	const combineRelatedGenre = [...movieGenre.genres, ...tvGenre.genres];

	const foundGenre = combineRelatedGenre.find((item) => item.id == parseInt(params.slug));
	const genreName = foundGenre ? foundGenre.name : "Unknown Genre";

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<section className={styles.container}>
				<h2>{`Shows related to ${genreName} ...`}</h2>
				<div className={styles.cardContainer}>
					{combineRelatedMedia.map((media) => (
						<MediaCard key={media.id} media={media} mediaMode={media.type} />
					))}
				</div>
			</section>
		</Suspense>
	);
}
