import { Suspense } from "react";
import styles from "./tvDetail.module.css";
import MediaOverview from "@/components/MediaOverview/MediaOverview";
import Spinner from "@/components/LoadingSkeletons/Spinner/Spinner";

export default async function page({ params }) {
	const mediaMode = "tv";

	return (
		<section className={styles.imgContainer}>
			<Suspense fallback={<Spinner />}>
				<MediaOverview params={params} mediaMode={mediaMode} />
			</Suspense>
		</section>
	);
}
