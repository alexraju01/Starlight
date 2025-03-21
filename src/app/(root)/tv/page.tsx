import { Suspense } from "react";

import { LoadingSkeletons } from "@/components";
import MediaWrapper from "@/components/MediaHandlers/MediaWrapper";
import { MediaMode } from "@/types/mediaMode";

import styles from "./page.module.css";

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
