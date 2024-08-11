import styles from "./GenreSkeleton.module.css";

export default function GenreSkeleton() {
	const placeholderCards = Array.from({ length: 35 }).map((_, index) => (
		<div key={index} className={styles.pulse}></div>
	));

	return (
		<div className={styles.container}>
			<div className={styles.genreContainer}>{placeholderCards}</div>
		</div>
	);
}
