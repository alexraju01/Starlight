import styles from "./movies.module.css";
import fetchData from "@/utils/fetchData";
import MediaCard from "@/components/MediaCard/MediaCard";

export const metadata = {
	title: "Movies",
};

export default async function MoviesPage() {
	const movies = await fetchData("3", "movie/popular");

	return (
		<div className={styles.container}>
			<h2>TV Shows List</h2>
			<div className={styles.movieContainer}>
				{movies.results.map((movie) => (
					<MediaCard key={movie.id} media={movie} mediaMode={"movie"} />
				))}
			</div>
		</div>
	);
}
