// import styles from "./loading.module.css";

// export default function Loading() {
// 	const placeholderCards = Array.from({ length: 20 }).map((_, index) => (
// 		<div key={index} className={styles.skeletonCard}></div>
// 	));

// 	return (
// 		<div className={styles.container}>
// 			<div className={styles.movieContainer}>{placeholderCards}</div>
// 		</div>
// 	);
// }

// loading.js
import styles from "./loading.module.css";

export default function Loading() {
	const placeholderCards = Array.from({ length: 20 }).map((_, index) => (
		<div key={index} className={styles.pulse}></div>
	));

	return (
		<div className={styles.container}>
			<div className={styles.movieContainer}>{placeholderCards}</div>
		</div>
	);
}
