import styles from "./loading.module.css";
export default function Loading() {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Movie List</h1>

			<ul className={styles.movieContainer}>
				{Array(20)
					.fill(0)
					.map((_el, index) => (
						<li key={index}>
							<div className={styles.loadingItem}></div>
						</li>
					))}
			</ul>
		</div>
	);
}
