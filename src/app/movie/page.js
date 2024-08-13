"use client";
import styles from "./movies.module.css";
import MediaCard from "@/components/MediaCard/MediaCard";
import { Suspense, useEffect, useState } from "react";
import LoadingSkeletons from "@/components/LoadingSkeletons/LoadingSkeletons";
import { useInView } from "react-intersection-observer";
import getMedia from "@/utils/serverActions/getMedia";
import Button from "@/components/Button/Button";

export default function MoviesPage() {
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [ref, inView] = useInView();
	const [loading, setLoading] = useState(false);

	// Load the first page of movies when the component mounts

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
		<div className={styles.container} style={{ animation: "fadeIn 0.5s ease-in-out" }}>
			<h2>Movies List</h2>
			{/* <Suspense fallback={<LoadingSkeletons />}> */}
			<div className={styles.movieContainer}>
				{movies.map(
					(movie) =>
						movie.poster_path && <MediaCard key={movie.id} media={movie} mediaMode={"movie"} />
				)}
			</div>
			{/* </Suspense> */}
			{/* <div ref={ref}>
				<LoadingSkeletons className={styles.load}></LoadingSkeletons>
				</div> */}
			<div className={styles.loadMore}>
				<Button icon={loading && <div className={styles.spinner}></div>} onClick={loadMoreMovies}>
					Load More
				</Button>
			</div>

			{/* <button className={styles.loadMore} onClick={loadMoreMovies}>
				Load more
			</button> */}
		</div>
	);
}
