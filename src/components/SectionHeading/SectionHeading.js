import styles from "./SectionHeading.module.css";

export default function SectionHeading({ children, icon }) {
	return (
		<div className={styles.heading}>
			<i>{icon}</i>
			<h2>{children}</h2>
		</div>
	);
}
