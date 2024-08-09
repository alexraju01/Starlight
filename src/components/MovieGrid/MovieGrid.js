"use client";
import MediaCard from "../MediaCard/MediaCard";
import styles from "./MovieGrid.module.css";

export default function MovieGrid({ media }) {
	if (!media.length) return null;

	return (
		<div className={styles.container}>
			{media.map((multi) => (
				<div key={multi.id} className={styles.card}>
					<MediaCard media={multi} mediaMode={multi.media_type} />
				</div>
			))}
		</div>
	);
}
