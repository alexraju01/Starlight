import styles from "./movieDetail.module.css";
import { Suspense } from "react";
import MediaOverview from "@/components/MediaOverview/MediaOverview";
import Spinner from "@/components/LoadingSkeletons/Spinner/Spinner";
import { MediaMode } from "@/types/mediaMode";

interface Props {
	params: Promise<{ slug: string }>;
}

export default async function page({ params }: Props) {
	const { slug } = await params;

	return (
		<section className={styles.imgContainer}>
			<Suspense fallback={<Spinner />}>
				<MediaOverview params={slug} mediaMode={MediaMode.Movie} />
			</Suspense>
		</section>
	);
}
