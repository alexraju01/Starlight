import { Suspense } from "react";

import { Spinner } from "@/components/LoadingSkeletons";
import MediaWrapper from "@/components/MediaHandlers/MediaWrapper";
import { MediaMode } from "@/types/mediaMode";

import styles from "./Upcoming.module.css";

export default async function UpcomingPage() {
	return (
		<div className={styles.container}>
			<h2>Upcoming shows</h2>
			<div className={styles.upcomingContainer}>
				<Suspense fallback={<Spinner />}>
					<MediaWrapper mediaMode={MediaMode.UPCOMING} />
				</Suspense>
			</div>
		</div>
	);
}
