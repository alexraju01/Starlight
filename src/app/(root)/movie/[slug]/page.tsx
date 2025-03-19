import Spinner from "../../../../components/LoadingSkeletons/Spinner/Spinner";
import styles from "./movieDetail.module.css";
import MediaOverview from "../../../../components/MediaOverview/MediaOverview";
import { Suspense } from "react";

// interface Props {
// 	params: Promise<{ slug: string }>;
// }

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const mediaMode = "movie";

	return (
		<section className={styles.imgContainer}>
			<Suspense fallback={<Spinner />}>
				<MediaOverview params={slug} mediaMode={mediaMode} />
			</Suspense>
		</section>
	);
}
