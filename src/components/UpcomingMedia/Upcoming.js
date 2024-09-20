import React from "react";
import styles from "./UpcomingMedia.module.css"; // Assuming you have specific styles
import MediaCard from "../MediaCard/MediaCard";
import Icons from "../../utils/icons";
// import getUpcoming from "@/utils/serverActions/getUpcoming";

export default function UpcomingMedia({ media, mediaMode }) {
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

// export default async function UpcomingMedia() {
// 	const media = await getUpcoming("tv");
// 	const mediaMode = "tv";
// 	console.log(media);

// 	return (
// 		<>
// 			{media.map((item) => (
// 				<div key={item.id} className={styles.container}>
// 					<div className={styles.itemContainer}>
// 						<div className={styles.imgContainer}>
// 							<MediaCard className={styles.noHover} media={item} mediaMode={"tv"} />
// 						</div>
// 						<div className={styles.content}>
// 							<div className={styles.heading}>
// 								<h2>{media.title || media.name}</h2>
// 								<span>{mediaMode.toUpperCase()}</span>
// 							</div>

// 							<p className={styles.description}>{media.overview}</p>

// 							<p className={styles.date}>
// 								<i>{Icons.calendar}</i>
// 								Release Date: {media.release_date || media.first_air_date}
// 							</p>
// 						</div>
// 					</div>
// 				</div>
// 			))}
// 		</>
// 	);
// }
