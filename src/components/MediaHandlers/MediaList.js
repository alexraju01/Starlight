"use client";
import styles from "./Media.module.css";

import Button from "@/components/Button/Button";
import MediaCard from "@/components/MediaCard/MediaCard";
import getMedia from "@/utils/serverActions/getMedia";
import getUpcoming from "@/utils/serverActions/getUpcoming";
import { Loader } from "lucide-react";
import { useState } from "react";

export default function MediaList({ initialMedia, mediaMode }) {
	const [media, setMedia] = useState(initialMedia);
	const [page, setPage] = useState(1);
	const [buttonHidden, setButtonHidden] = useState(initialMedia.length === 0);
	const [loading, setLoading] = useState(false);

	const loadMoreMedia = async () => {
		setLoading(true);

		// Use getUpcoming if mediaMode is 'upcoming', otherwise use getMedia
		const mediaList =
			mediaMode === "upcoming"
				? await getUpcoming("tv", page + 1)
				: await getMedia(mediaMode, page + 1);

		// Filter out movies that are already in the list
		const newMedia = mediaList.filter(
			(newMedia) => !media.some((existingMedia) => existingMedia.id === newMedia.id)
		);

		setButtonHidden(mediaList.length === 0);
		setMedia((prevMedia) => [...prevMedia, ...newMedia]);
		setPage((prevPage) => prevPage + 1);
		setLoading(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.mediaContainer}>
				{media.map(
					(media) =>
						media.poster_path && (
							<div key={media.id}>
								<MediaCard media={media} mediaMode={mediaMode === "upcoming" ? "tv" : mediaMode} />
								{mediaMode === "upcoming" && (
									<p>
										{media.name} - {media.first_air_date}
									</p>
								)}
							</div>
						)
				)}
			</div>
			{!buttonHidden && (
				<div className={styles.loadMore}>
					<Button
						icon={loading && <Loader className={styles.animateSpin} />}
						onClick={loadMoreMedia}
						disabled={loading}
					>
						Load More
					</Button>
				</div>
			)}
		</div>
	);
}
