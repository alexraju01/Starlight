import { Suspense } from "react";

import { Spinner } from "@/components/Feedback/LoadingSkeletons";
import { MediaMode } from "@/types/mediaMode";

import styles from "./Upcoming.module.css";
import MediaWrapper from "@/components/Media/MediaHandlers/MediaWrapper";

export default async function UpcomingPage() {
	return (
		<div className='flex flex-col justify-center items-center mt-60 md:mt-30'>
			<h2>Upcoming shows</h2>
			<div className={styles.upcomingContainer}>
				<Suspense fallback={<Spinner />}>
					<MediaWrapper mediaMode={MediaMode.UPCOMING} />
				</Suspense>
			</div>
		</div>
	);
}
