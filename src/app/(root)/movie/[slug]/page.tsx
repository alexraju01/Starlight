import Spinner from "../../../../components/LoadingSkeletons/Spinner/Spinner";
import styles from "./movieDetail.module.css";
import MediaOverview from "../../../../components/MediaOverview/MediaOverview";
import { Suspense } from "react";

interface Props {
	params: Promise<{ slug: string }>;
}

export default async function page({ params }: Props) {
	const { slug } = await params;
	const mediaMode = "tv";

	return (
		<section className={styles.imgContainer}>
			<Suspense fallback={<Spinner />}>
				<MediaOverview params={slug} mediaMode={mediaMode} />
			</Suspense>
		</section>
	);
}
