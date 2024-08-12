import Upcoming from "@/components/Upcoming/Upcoming";
import styles from "./Upcoming.module.css";
import { Suspense } from "react";
export default async function UpcomingPage() {
	return (
		<div className={styles.container}>
			<h2>Upcoming shows</h2>
			<div className={styles.upcomingContainer}>
				<Suspense fallback={<div>Loading. . . </div>}>
					<Upcoming />
				</Suspense>
			</div>
		</div>
	);
}
