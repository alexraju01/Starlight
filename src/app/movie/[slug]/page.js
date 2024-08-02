import styles from "./movieDetail.module.css";
// import MovieOverview from "@/components/MovieOverview/MovieOverview";
// import CastContainer from "@/components/Cast/CastContainer";
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
		// <Suspense fallback={<Loading />}>
		<section className={styles.imgContainer}>
			<MediaOverview params={params} mediaMode={mediaMode} />
			{/* <CastContainer castList={casts} /> */}
			{/* <div></div> */}
		</section>
		// </Suspense>
	);
}
