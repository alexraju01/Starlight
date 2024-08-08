import Carousel from "@/components/Carousel/Carousel";
import styles from "./page.module.css";
import Slider from "@/components/Slider/Slider";
import SearchBox from "@/components/SearchBox/SearchBox";

export default async function Home() {
	const mediaMode = "movie";
	return (
		<main className={styles.container}>
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
		</main>
	);
}
