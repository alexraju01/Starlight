import styles from "./Upcoming.module.css";
import { Suspense } from "react";
import MediaWrapper from "../../../components/MediaHandlers/MediaWrapper";
import Spinner from "../../../components/LoadingSkeletons/Spinner/Spinner";
import { MediaMode } from "@/types/mediaMode";
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
