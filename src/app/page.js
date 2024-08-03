import Carousel from "@/components/Carousel/Carousel";
import styles from "./page.module.css";
import Slider from "@/components/Slider/Slider";

export default function tvs() {
	return (
		<main className={styles.container}>
			<div className={styles.top}>
				<input className={styles.searchBox} type="text" placeholder="Search..." />
				<div className={styles.profile}>{/* <i>{Icons.bell}</i> */}</div>
			</div>
			<div className={styles.carouselContainer}>
				<Carousel />
			</div>
			<div className={styles.newest}>
				<h2 className={styles.subHeading}>Top 20 Rated</h2>
				<Slider type={"movie/top_rated"} />
			</div>
			<div className={styles.popular}>
				<h2 className={styles.subHeading}>Popular</h2>
				<Slider type={"movie/popular"} />
			</div>
		</main>
	);
}
