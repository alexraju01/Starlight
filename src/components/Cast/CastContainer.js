// import ImageWithFallback from "@/app/components/BrokenImage/ImageWithFallback";
import ImageWithFallback from "@/components/BrokenImage/ImageWithFallback";
import styles from "./CastContainer.module.css";

export default async function CastContainer({ castList }) {
	return (
		<div className={styles.container}>
			<h2>Cast</h2>

			<div className={styles.castListContainer}>
				{castList.cast.map((cast, index) => (
					<div key={index} className={styles.castListItem}>
						<div className={styles.castImgContainer}>
							<ImageWithFallback
								src={
									cast.profile_path
										? `https://image.tmdb.org/t/p/original${cast.profile_path}`
										: `https://image.tmdb.org/t/p/original/${cast.profile_path}`
								}
								alt={cast.name}
							/>
						</div>
						<div className={styles.content}>
							<p className={styles.name}>{cast.name}</p>
							<p className={styles.character}>{cast.character}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
