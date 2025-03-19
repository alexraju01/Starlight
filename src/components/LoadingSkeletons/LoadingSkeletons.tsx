import styles from "./LoadingSkeletons.module.css";

interface Props {
	children?: React.ReactNode;
	className?: string;
}

export default function LoadingSkeletons({ children, className }: Props) {
	const placeholderCards = Array.from({ length: 20 }).map((_, index) => (
		<div key={index} className={styles.pulse}></div>
	));
	return (
		<div className={`${styles.container} ${className}`}>
			<h2>{children}</h2>
			<div className={styles.movieContainer}>{placeholderCards}</div>
		</div>
	);
}
