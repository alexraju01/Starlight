import React from "react";

import { Media, TVShow } from "@/types/global";
import { MediaMode } from "@/types/mediaMode";
import Icons from "@/utils/icons";

import styles from "./UpcomingMedia.module.css";
import MediaCard from "../MediaCard/MediaCard";

interface Props {
	media: Media;
	mediaMode: MediaMode;
}

function isTVShow(media: Media): media is TVShow {
	return (media as TVShow).first_air_date !== undefined;
}

export default function UpcomingMedia({ media, mediaMode }: Props) {
	return (
		<div className={styles.container}>
			<div className={styles.imgContainer}>
				<MediaCard className={styles.noHover} media={media} mediaMode={mediaMode} />
			</div>

			<div className={styles.content}>
				<div className={styles.heading}>
					<h2>{mediaMode === "movie" ? media.title : media.name}</h2>
					<span>{mediaMode.toUpperCase()}</span>
				</div>

				<p className={styles.description}>{media.overview}</p>

				{/* Optimized Date Display */}
				<p className={styles.date}>
					<i />
					{Icons.calendar}
					Release Date: {isTVShow(media) ? media.first_air_date : media.release_date}
				</p>
			</div>
		</div>
	);
}
