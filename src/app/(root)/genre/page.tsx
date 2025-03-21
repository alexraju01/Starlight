import { Suspense } from "react";

import GenreSkeleton from "@/components/LoadingSkeletons/GenreSkeleton";

import FetchGenres from "./FetchGenres";
import styles from "./genre.module.css";

export default function GenrePage() {
	return (
		<section className={styles.container}>
			<h2>List of all the movies</h2>
			<Suspense fallback={<GenreSkeleton />}>
				<FetchGenres />
			</Suspense>
		</section>
	);
}
