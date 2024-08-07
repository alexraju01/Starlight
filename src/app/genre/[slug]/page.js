// "use client";
import MediaCard from "@/components/MediaCard/MediaCard";
import styles from "./genreMediaList.module.css";
import fetchData from "@/utils/fetchData";
// import { usePathname } from "next/navigation";

export default async function Page({ params }) {
	const [movieGenre, tvGenre, genreRelatedMovies, genreRelatedTv] = await Promise.all([
		fetchData(3, "genre/movie/list"),
		fetchData(3, "genre/tv/list"),
		fetchData(3, `discover/movie?with_genres=${params.slug}`, 1),
		fetchData(3, `discover/tv?with_genres=${params.slug}`, 1),
	]);

	const moviesWithType = genreRelatedMovies.results.map((movie) => ({
		...movie,
		type: "movie",
	}));
	const tvsWithType = genreRelatedTv.results.map((tv) => ({
		...tv,
		type: "tv",
	}));

	// const genreRelatedMovies = await fetchData(3, `discover/movie?with_genres=${params.slug}`, 1);
	// const genreRelatedTv = await fetchData(3, `discover/tv?with_genres=${params.slug}`, 1);

	const combineRelatedMedia = [...moviesWithType, ...tvsWithType];
	console.log(combineRelatedMedia);

	const foundGenre = movieGenre.genres.find((item) => item.id == parseInt(params.slug));
	const genreName = foundGenre ? foundGenre.name : "Unknown Genre"; // Default to "Unknown Genre"

	return (
		<section className={styles.container}>
			<h2>{`Shows related to ${genreName} ...`}</h2>

			<div className={styles.cardContainer}>
				{combineRelatedMedia.map((media) => (
					<MediaCard key={media.id} media={media} mediaMode={media.type} />
				))}
			</div>
			<button>Load more</button>
		</section>
	);
}
