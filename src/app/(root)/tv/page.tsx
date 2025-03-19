import LoadingSkeletons from "@/components/LoadingSkeletons/LoadingSkeletons";
import styles from "./page.module.css";
import { Suspense } from "react";
import MediaWrapper from "@/components/MediaHandlers/MediaWrapper";
import { MediaMode } from "@/types/mediaMode";

export default async function Tv() {
	return (
		<div className={styles.container}>
			<h2>TV Shows List</h2>
			<Suspense fallback={<LoadingSkeletons />}>
				<MediaWrapper mediaMode={MediaMode.TV} />
			</Suspense>
		</div>
	);
}
