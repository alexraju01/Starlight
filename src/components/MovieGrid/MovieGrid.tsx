"use client";
import { Media } from "@/types/global";

import styles from "./MovieGrid.module.css";
import MediaCard from "../MediaCard/MediaCard";

interface Props {
	media: Media[];
}

export default function MovieGrid({ media }: Props) {
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
