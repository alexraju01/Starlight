import MediaWrapper from "../../../components/MediaHandlers/MediaWrapper";
import styles from "./page.module.css";
import { Suspense } from "react";
import LoadingSkeletons from "../../../components/LoadingSkeletons/LoadingSkeletons";

export default async function Tv() {
	return (
		<div className={styles.container}>
			<h2>TV Shows List</h2>
			<Suspense fallback={<LoadingSkeletons />}>
				<MediaWrapper mediaMode={"tv"} />
			</Suspense>
		</div>
	);
}
