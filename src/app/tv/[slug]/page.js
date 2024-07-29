import fetchData from "@/utils/fetchData";
import styles from "./tvDetail.module.css";
import CastContainer from "@/components/Cast/CastContainer";
import MediaOverview from "@/components/MediaOverview/MediaOverview";

// export async function generateMetadata({ params }) {
// 	const movieDetails = await fetchData(3, `/movie/${params.slug}`);
// 	return {
// 		title: movieDetails.title,
// 	};
// }

export default async function page({ params }) {
	const mediaMode = "tv";
	const casts = await fetchData(3, `/${mediaMode}/${params.slug}/credits`);

	console.log(mediaMode);
	return (
		<section className={styles.imgContainer}>
			<MediaOverview params={params} mediaMode={mediaMode} />
			<CastContainer castList={casts} />
			{/* <div></div> */}
		</section>
	);
}
