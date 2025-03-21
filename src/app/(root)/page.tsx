import { Suspense } from "react";

import { SearchBox, Slider, Carousel } from "@/components";
import { Spinner } from "@/components/LoadingSkeletons";
import { MediaMode } from "@/types/mediaMode";

import styles from "./page.module.css";

export default async function Home() {
	const mediaMode: MediaMode = MediaMode.Movie; // Now using the enum
	return (
		<main className={styles.container}>
			<Suspense fallback={<Spinner />}>
				<div className={styles.top}>
					<div className={styles.searchWrapper}>
						<SearchBox />
					</div>
				</div>
				<div className={styles.carouselContainer}>
					<Carousel mediaMode={mediaMode} />
				</div>
				<div className={styles.newest}>
					<h2 className={styles.subHeading}>Top 20 Rated</h2>
					<Slider mediaMode={mediaMode} endpoint={`${mediaMode}/top_rated`} />
				</div>

				<div className={styles.popular}>
					<h2 className={styles.subHeading}>Popular</h2>
					<Slider mediaMode={mediaMode} endpoint={`${mediaMode}/popular`} />
				</div>
			</Suspense>
		</main>
	);
}
