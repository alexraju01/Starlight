import styles from "./Dot.module.css";

interface Props {
	className: string;
}

export default function Dot({ className }: Props) {
	return <span className={`${styles.dot} ${className}`}></span>;
}
