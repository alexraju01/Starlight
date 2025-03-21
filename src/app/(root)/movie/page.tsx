import { Suspense } from "react";

import { LoadingSkeletons } from "@/components";
import MediaWrapper from "@/components/MediaHandlers/MediaWrapper";
import { MediaMode } from "@/types/mediaMode";

import styles from "./page.module.css";

export default function MoviesPage() {
	return (
		<div className={styles.container} style={{ animation: "fadeIn 0.5s ease-in-out" }}>
			<h2>Movies List</h2>
			<Suspense fallback={<LoadingSkeletons />}>
				<MediaWrapper mediaMode={MediaMode.Movie} />
			</Suspense>
		</div>
	);
}
