import styles from "./Button.module.css";

export default function Button(props) {
	return (
		<button className={styles.btn} {...props}>
			<i>{props.icon}</i>
			<p>{props.children}</p>
		</button>
	);
}
