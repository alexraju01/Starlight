import React from "react";
import styles from "./UpcomingMedia.module.css"; // Assuming you have specific styles
import MediaCard from "../MediaCard/MediaCard";
import Image from "next/image";
import Icons from "@/utils/icons";

export default function UpcomingMedia({ media, mediaMode }) {
	console.log(media);
	return (
		<div className={styles.container}>
			<div className={styles.imgContainer}>
				<MediaCard className={styles.noHover} media={media} mediaMode={"tv"} />
			</div>
			<div className={styles.content}>
				<div className={styles.heading}>
					<h2>{media.title || media.name}</h2>
					<span>{mediaMode.toUpperCase()}</span>
				</div>

				<p className={styles.description}>{media.overview}</p>

				<p className={styles.date}>
					<i>{Icons.calendar}</i>
					Release Date: {media.release_date || media.first_air_date}
				</p>
			</div>
		</div>
	);
}
