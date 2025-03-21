import { Suspense } from "react";

import { MediaOverview } from "@/components";
import { Spinner } from "@/components/LoadingSkeletons";
import { MediaMode } from "@/types/mediaMode";

import styles from "./tvDetail.module.css";

interface Props {
	params: Promise<{ slug: string }>;
}

export default async function page({ params }: Props) {
	const { slug } = await params;

	return (
		<section className={styles.imgContainer}>
			<Suspense fallback={<Spinner />}>
				<MediaOverview params={slug} mediaMode={MediaMode.TV} />
			</Suspense>
		</section>
	);
}
