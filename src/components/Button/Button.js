import styles from "./Button.module.css";

export default function Button({ icon, children }) {
	return (
		<button className={styles.btn}>
			<i>{icon}</i>
			<p>{children}</p>
		</button>
	);
}
