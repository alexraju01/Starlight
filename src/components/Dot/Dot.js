import styles from "./Dot.module.css";

export default function Dot({ className }) {
	return <span className={`${styles.dot} ${className}`}></span>;
}
