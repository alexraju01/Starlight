import styles from "./Button.module.css";

export default function Button({ icon, children, ...props }) {
	return (
		<button className={styles.btn} {...props}>
			{icon && <i>{icon}</i>}
			<p>{children}</p>
		</button>
	);
}
