"use client";
import styles from "./movies.module.css";

import Button from "@/components/Button/Button";
import MediaCard from "@/components/MediaCard/MediaCard";
import getMedia from "@/utils/serverActions/getMedia";
import { useEffect, useState } from "react";

export default function MovieList({ initialMovies }) {
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);
	// const [ref, inView] = useInView();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// if (inView) {
		loadMoreMovies();
		// }
	}, []);

	const loadMoreMovies = async () => {
		setLoading(true); // Start loading
		const movieList = await getMedia("movie", page + 1);
		setMovies([...movies, ...movieList]);
		setPage(page + 1);
		setLoading(false); // Stop loading
	};

	return (
		<div className={styles.movieContainer}>
			{initialMovies.map(
				(movie) =>
					movie.poster_path && <MediaCard key={movie.id} media={movie} mediaMode={"movie"} />
			)}
			<div className={styles.loadMore}>
				<Button icon={loading && <div className={styles.spinner}></div>} onClick={loadMoreMovies}>
					Load More
				</Button>
			</div>
		</div>
	);
}
