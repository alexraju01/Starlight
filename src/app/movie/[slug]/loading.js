import styles from "./loading.module.css";
export default async function Loading() {
	return (
		<div className={styles.loadingContainer}>
			{/* <h1>movie details</h1> */}
			<div className={styles.loadingItem}></div>
		</div>
	);
}
