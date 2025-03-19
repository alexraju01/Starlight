import { Suspense } from "react";
import styles from "./tvDetail.module.css";
import Spinner from "@/components/LoadingSkeletons/Spinner/Spinner";
import MediaOverview from "@/components/MediaOverview/MediaOverview";

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
