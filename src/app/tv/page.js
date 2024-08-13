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
			loadMoreTvShows();
		}
	}, [inView]);

	// const loadMoreMovies = async () => {
	// 	const tvList = await getMedia("tv", page + 1);
	// 	setTvs([...tvs, ...tvList]);
	// 	setPage(page + 1);
	// };

	const loadMoreTvShows = async () => {
		const tvList = await getMedia("tv", page); // Fetch current page
		setTvs((prevTvs) => {
			const newTvs = [...prevTvs, ...tvList];
			return newTvs.filter((tv, index, self) => index === self.findIndex((t) => t.id === tv.id));
		});
		setPage((prevPage) => prevPage + 1); // Increment page number
	};

	return (
		<div className={styles.container}>
			<h2>TV Shows List</h2>
			<Suspense fallback={<div>Loading. . .</div>}>
				<div className={styles.tvContainer}>
					{tvs.map((tv) => tv.poster_path && <MediaCard key={tv.id} media={tv} mediaMode={"tv"} />)}
				</div>
			</Suspense>
			<div ref={ref}>
				<LoadingSkeletons></LoadingSkeletons>
			</div>
		</div>
	);
}

// "use client";
// import MediaCard from "@/components/MediaCard/MediaCard";
// import styles from "./page.module.css";
// import { useEffect, useState } from "react";
// import getMedia from "@/utils/serverActions/getMedia";
// import { motion } from "framer-motion";
// import LoadingSkeletons from "@/components/LoadingSkeletons/LoadingSkeletons";

// export default function Tv() {
// 	const [tvs, setTvs] = useState([]);
// 	const [page, setPage] = useState(1);
// 	const [isFetching, setIsFetching] = useState(false);

// 	useEffect(() => {
// 		// Load the first page of TV shows when the component mounts
// 		loadMoreTvShows();
// 	}, []);

// 	useEffect(() => {
// 		const handleScroll = () => {
// 			if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isFetching) {
// 				setIsFetching(true);
// 			}
// 		};

// 		window.addEventListener("scroll", handleScroll);
// 		return () => window.removeEventListener("scroll", handleScroll);
// 	}, [isFetching]);

// 	useEffect(() => {
// 		if (isFetching) {
// 			loadMoreTvShows();
// 		}
// 	}, [isFetching]);

// 	const loadMoreTvShows = async () => {
// 		const tvList = await getMedia("tv", page); // Fetch current page
// 		setTvs((prevTvs) => {
// 			const newTvs = [...prevTvs, ...tvList];
// 			// Remove duplicates by filtering based on unique IDs
// 			return newTvs.filter((tv, index, self) => index === self.findIndex((t) => t.id === tv.id));
// 		});
// 		setPage((prevPage) => prevPage + 1); // Increment page number
// 		setIsFetching(false);
// 	};

// 	return (
// 		<div className={styles.container}>
// 			<h2>TV Shows List</h2>
// 			<motion.div
// 				className={styles.tvContainer}
// 				initial="hidden"
// 				animate="visible"
// 				variants={{
// 					hidden: { opacity: 0 },
// 					visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
// 				}}
// 			>
// 				{tvs.map((tv) =>
// 					tv.poster_path ? (
// 						<motion.div
// 							key={tv.id}
// 							variants={{
// 								hidden: { opacity: 0, y: 20 },
// 								visible: { opacity: 1, y: 0 },
// 							}}
// 						>
// 							<MediaCard media={tv} mediaMode={"tv"} />
// 						</motion.div>
// 					) : null
// 				)}
// 			</motion.div>
// 			{isFetching && <LoadingSkeletons />}
// 		</div>
// 	);
// }
