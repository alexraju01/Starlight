"use client";
import MediaCard from "@/components/MediaCard/MediaCard";
import styles from "./page.module.css";
import { Suspense, useEffect, useState } from "react";
import LoadingSkeletons from "@/components/LoadingSkeletons/LoadingSkeletons";
import { useInView } from "react-intersection-observer";
import getMedia from "@/utils/serverActions/getMedia";

export default function Tv() {
	const [tvs, setTvs] = useState([]);
	const [page, setPage] = useState(1);
	const [ref, inView] = useInView();

	// Load the first page of movies when the component mounts

	useEffect(() => {
		if (inView) {
			loadMoreMovies();
		}
	}, [inView]);

	const loadMoreMovies = async () => {
		const tvList = await getMedia("tv", page + 1);
		setTvs([...tvs, ...tvList]);
		setPage(page + 1);
	};
	return (
		<div className={styles.container}>
			<h2>TV Shows List</h2>

			<div className={styles.tvContainer}>
				{tvs.map((tv) => tv.poster_path && <MediaCard key={tv.id} media={tv} mediaMode={"tv"} />)}
			</div>
			<div ref={ref}>
				<LoadingSkeletons></LoadingSkeletons>
			</div>
		</div>
	);
}
