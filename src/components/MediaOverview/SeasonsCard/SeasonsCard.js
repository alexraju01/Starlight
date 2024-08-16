import Link from "next/link";
import styles from "./SeasonsCard.module.css";
import ImageWithFallback from "@/components/BrokenImage/ImageWithFallback";
import fetchData from "@/utils/fetchData";

export default async function SeasonsCard({ id, season }) {
	return (
		<div key={season.id} className={styles.season}>
			<div className={styles.seasonPoster}>
				<ImageWithFallback
					className={styles.image}
					src={
						season.poster_path
							? `https://image.tmdb.org/t/p/w185${season.poster_path}`
							: `https://image.tmdb.org/t/p/w185/`
					}
					alt={season.name}
				/>
			</div>
			<h2>{season.name}</h2>
		</div>
	);
}
