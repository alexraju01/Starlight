import { Season } from "@/types/seasons";

import styles from "./SeasonsCard.module.css";
import ImageWithFallback from "../../BrokenImage/ImageWithFallback";

// Define Props Type
interface Props {
	id: number;
	season: Season;
}

export default async function SeasonsCard({ season }: Props) {
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
