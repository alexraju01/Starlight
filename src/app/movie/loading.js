import styles from "./loading.module.css";

export default function Loading() {
	// Creating an array of placeholder cards
	const placeholderCards = Array.from({ length: 20 }).map((_, index) => (
		<div key={index} className={styles.skeletonCard}></div>
	));

	return (
		<div className={styles.container}>
			{/* <h2>Loading Movies...</h2> */}
			<div className={styles.movieContainer}>{placeholderCards}</div>
		</div>
	);
}
