import styles from "./movieDetail.module.css";
import MediaOverview from "@/components/MediaOverview/MediaOverview";

// export async function generateMetadata({ params }) {
// 	const movieDetails = await fetchData(3, `/movie/${params.slug}`);
// 	return {
// 		title: movieDetails.title,
// 	};
// }

export default async function page({ params }) {
	const mediaMode = "movie";

	return (
		<section className={styles.imgContainer}>
			<MediaOverview params={params} mediaMode={mediaMode} />
		</section>
	);
}
