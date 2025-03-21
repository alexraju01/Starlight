import styles from "./RatingIcon.module.css";

interface Props {
	vote: number;
	className?: string;
}

export default function RatingIcon({ vote, className }: Props) {
	console.log("qqqqqqqqqqqqqqqqq", vote);
	return (
		<div className={styles.rating}>
			<p className={`${styles.icon} ${className}`}>TMDB</p>
			<p className={styles.rate}>{vote?.toFixed(1)}</p>
		</div>
	);
}
