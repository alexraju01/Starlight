import MediaCard from "@/components/MediaCard/MediaCard";
import fetchData from "@/utils/fetchData";
import styles from "./page.module.css";

export default async function page() {
	const tvs = await fetchData(3, `tv/popular`);

	return (
		<div className={styles.container}>
			<h2>TV Shows List</h2>
			<div className={styles.movieContainer}>
				{tvs.results.map((tv) => (
					<MediaCard key={tv.id} media={tv} mediaMode={"tv"} />
				))}
			</div>
		</div>
	);
}
