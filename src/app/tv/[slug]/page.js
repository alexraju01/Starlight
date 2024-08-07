import { Suspense } from "react";
import styles from "./tvDetail.module.css";
import MediaOverview from "@/components/MediaOverview/MediaOverview";

export default async function page({ params }) {
	const mediaMode = "tv";

	return (
		// <Suspense fallback={"hellokjdfkgkg"}>
		<section className={styles.imgContainer}>
			<MediaOverview params={params} mediaMode={mediaMode} />
		</section>
		// </Suspense>
	);
}
