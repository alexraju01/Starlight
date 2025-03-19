// BrokenImage.js
import styles from "./BrokenImage.module.css"; // Import CSS module for styles

export default function BrokenImage({ className }) {
	return (
		<div className={`${styles.brokenImage} ${className}`}>
			<p>Image not available</p>
		</div>
	);
}
