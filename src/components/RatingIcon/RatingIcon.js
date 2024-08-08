import styles from "./RatingIcon.module.css";

export default function RatingIcon({ mediaDetails, className = null }) {
	return (
		<div className={styles.rating}>
			<p className={`${styles.icon} ${className}`}>IMDb</p>
			<p className={styles.rate}>{mediaDetails.vote_average.toFixed(1)}</p>
		</div>
	);
}
