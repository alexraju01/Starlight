import styles from "./tvDetail.module.css";
import MediaOverview from "@/components/MediaOverview/MediaOverview";

export default async function page({ params }) {
	const mediaMode = "tv";
	// const casts = await fetchData(3, `/${mediaMode}/${params.slug}/credits`);

	return (
		<section className={styles.imgContainer}>
			<MediaOverview params={params} mediaMode={mediaMode} />
			{/* <CastContainer castList={casts} /> */}
		</section>
	);
}
