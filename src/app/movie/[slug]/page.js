import Spinner from "@/components/Spinner/Spinner";
import styles from "./movieDetail.module.css";
import MediaOverview from "@/components/MediaOverview/MediaOverview";
import { Suspense } from "react";

// export async function generateStaticParams() {
// 	const movies = await fetchData(3, "discover/movie");
// 	return movies.results.map((movie) => ({
// 		slug: movie.id.toString(),
// 	}));
// }

export default async function page({ params }) {
	const mediaMode = "movie";

	return (
		<section className={styles.imgContainer}>
			<Suspense fallback={<Spinner />}>
				<MediaOverview params={params} mediaMode={mediaMode} />
			</Suspense>
		</section>
	);
}
