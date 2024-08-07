import styles from "./movieDetail.module.css";
import MediaOverview from "@/components/MediaOverview/MediaOverview";
import fetchData from "@/utils/fetchData";

// export async function generateStaticParams() {
// 	const movies = await fetchData(3, "discover/movie");
// 	return movies.results.map((movie) => ({
// 		slug: movie.id.toString(),
// 	}));
// }

export default async function page({ params }) {
	console.log(params);
	const mediaMode = "movie";

	return (
		<section className={styles.imgContainer}>
			<MediaOverview params={params} mediaMode={mediaMode} />
		</section>
	);
}
