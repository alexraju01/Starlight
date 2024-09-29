import { Suspense } from "react";
import GenreSkeleton from "../../../components/LoadingSkeletons/GenreSkeleton";
import dynamic from "next/dynamic";
import styles from "./genre.module.css";
import FetchGenres from "./FetchGenres";

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
