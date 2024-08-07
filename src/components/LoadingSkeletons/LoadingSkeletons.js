import styles from "./LoadingSkeletons.module.css";

export default function LoadingSkeletons() {
	const placeholderCards = Array.from({ length: 20 }).map((_, index) => (
		<div key={index} className={styles.pulse}></div>
	));

	return (
		<div className={styles.container}>
			jdhsfgsjkhd
			<div className={styles.movieContainer}>{placeholderCards}</div>
		</div>
	);
}
