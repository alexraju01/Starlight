import MediaCard from "@/components/MediaCard/MediaCard";
import fetchData from "@/utils/fetchData";
import styles from "./page.module.css";
import { Suspense } from "react";
import LoadingSkeletons from "@/components/LoadingSkeletons/LoadingSkeletons";

export default async function page() {
	const tvs = await fetchData(3, `tv/popular`);

	return (
		<div className={styles.container}>
			<h2>TV Shows List</h2>

			<Suspense fallback={<LoadingSkeletons />}>
				<div className={styles.tvContainer}>
					{tvs.results.map(
						(tv) => tv.poster_path && <MediaCard key={tv.id} media={tv} mediaMode={"tv"} />
					)}
				</div>
			</Suspense>
		</div>
	);
}
