// BrokenImage.js
import styles from "./BrokenImage.module.css"; // Import CSS module for styles

interface Props {
	className: string;
}

export default function BrokenImage({ className }: Props) {
	return (
		<div className={`${styles.brokenImage} ${className}`}>
			<p>Image not available</p>
		</div>
	);
}
