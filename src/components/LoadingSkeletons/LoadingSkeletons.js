import styles from "./LoadingSkeletons.module.css";

export default function LoadingSkeletons({ children, className }) {
	const placeholderCards = Array.from({ length: 20 }).map((_, index) => (
		<div key={index} className={styles.pulse}></div>
	));
	console.log(className);
	return (
		<div className={`${styles.container} ${className}`}>
			<h2>{children}</h2>
			<div className={styles.movieContainer}>{placeholderCards}</div>
		</div>
	);
}
