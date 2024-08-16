import React from "react";
import styles from "./UpcomingMedia.module.css"; // Assuming you have specific styles
import MediaCard from "../MediaCard/MediaCard";

export default function UpcomingMedia({ media }) {
	return (
		<div className={styles.upcomingMediaContainer}>
			<MediaCard media={media} mediaMode={"tv"} />
			<h2>{media.title || media.name}</h2>
			<p>{media.media_type}</p>
			<p>Release Date: {media.release_date || media.first_air_date}</p>
			{/* Render other details or additional components as needed */}
		</div>
	);
}
