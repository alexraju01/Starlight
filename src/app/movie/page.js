// import styles from "./movies.module.css";
// import fetchData from "@/utils/fetchData";
// import MediaCard from "@/components/MediaCard/MediaCard";

// export const metadata = {
// 	title: "Movies",
// };

// export default async function MoviesPage() {
// 	const movies = await fetchData("3", "movie/popular");

// 	return (
// 		<div className={styles.container}>
// 			<h2>TV Shows List</h2>
// 			<div className={styles.movieContainer}>
// 				{movies.results.map((movie) => (
// 					<MediaCard key={movie.id} media={movie} mediaMode={"movie"} />
// 				))}
// 			</div>
// 		</div>
// 	);
// }

import styles from "./movies.module.css";
import fetchData from "@/utils/fetchData";
import MediaCard from "@/components/MediaCard/MediaCard";
import Loading from "./loading";
import { Suspense } from "react";

export const metadata = {
	title: "Movies",
};

export default async function MoviesPage() {
	const movies = await fetchData("3", "movie/popular");

	return (
		<Suspense fallback={<Loading />}>
			<div className={styles.container} style={{ animation: "fadeIn 0.5s ease-in-out" }}>
				<h2>Movies List</h2>
				<div className={styles.movieContainer}>
					{movies.results.map((movie) => (
						<MediaCard key={movie.id} media={movie} mediaMode={"movie"} />
					))}
				</div>
			</div>
		</Suspense>
	);
}
