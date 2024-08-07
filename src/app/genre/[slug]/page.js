import MediaCard from "@/components/MediaCard/MediaCard";
import styles from "./genreMediaList.module.css";
import fetchData from "@/utils/fetchData";
// import { usePathname } from "next/navigation";

export default async function Page({ params }) {
	const genreRelatedMovies = await fetchData(3, `discover/movie?with_genres=${params.slug}`, 1);
	const [movieGenre, tvGenre] = await Promise.all([
		fetchData(3, "genre/movie/list"),
		fetchData(3, "genre/tv/list"),
	]);

	const foundGenre = movieGenre.genres.find((item) => item.id == parseInt(params.slug));
	const genreName = foundGenre ? foundGenre.name : "Unknown Genre"; // Default to "Unknown Genre"

	return (
		<section className={styles.container}>
			<h2>{genreName}</h2>

			<div className={styles.cardContainer}>
				{genreRelatedMovies.results.map((movie) => (
					<MediaCard key={movie.id} media={movie} mediaMode={"movie"} />
				))}
			</div>
			<button>Load more</button>
		</section>
	);
}
