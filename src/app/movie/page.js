"use client";
import styles from "./movies.module.css";
import MediaCard from "@/components/MediaCard/MediaCard";
import { useEffect, useState } from "react";
import LoadingSkeletons from "@/components/LoadingSkeletons/LoadingSkeletons";
// import getMovies from "@/utils/actions2";
import { useInView } from "react-intersection-observer";
import getMovies from "@/utils/serverActions/getMovies";
// import { useInView } from "framer-motion";

export default function MoviesPage() {
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);
	// const [loading, setLoading] = useState(true);
	const [ref, inView] = useInView();

	// Load the first page of movies when the component mounts

	useEffect(() => {
		if (inView) {
			loadMoreMovies();
		}
	}, [inView]);

	const loadMoreMovies = async () => {
		const movieList = await getMovies(page + 1);
		setMovies([...movies, ...movieList]);
		setPage(page + 1);
	};

	return (
		<div className={styles.container} style={{ animation: "fadeIn 0.5s ease-in-out" }}>
			<h2>Movies List</h2>

			<div className={styles.movieContainer}>
				{movies.map((movie) => (
					<MediaCard key={movie.id} media={movie} mediaMode={"movie"} />
				))}
			</div>
			<div ref={ref}>
				<LoadingSkeletons className={styles.load}></LoadingSkeletons>
			</div>

			{/* <button className={styles.loadMore} onClick={loadMoreMovies}>
				Load more
			</button> */}
		</div>
	);
}
