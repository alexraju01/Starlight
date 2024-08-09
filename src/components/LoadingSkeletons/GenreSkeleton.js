import styles from "./GenreSkeleton.module.css";

export default function GenreSkeleton() {
	const placeholderCards = Array.from({ length: 35 }).map((_, index) => (
		<div key={index} className={styles.pulse}></div>
	));

	return (
		<div className={styles.container}>
			<h2>List of all the movies</h2>

			<div className={styles.movieContainer}>{placeholderCards}</div>
		</div>
	);
}
