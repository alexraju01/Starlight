import styles from "./tvDetail.module.css";
import MediaOverview from "@/components/MediaOverview/MediaOverview";

export default async function page({ params }) {
	const mediaMode = "tv";

	return (
		<section className={styles.imgContainer}>
			<MediaOverview params={params} mediaMode={mediaMode} />
		</section>
	);
}
