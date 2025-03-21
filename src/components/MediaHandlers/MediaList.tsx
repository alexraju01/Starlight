"use client";
import { Loader } from "lucide-react";
import { useState } from "react";

import { Movie, TVShow } from "@/types/global";
import { MediaMode } from "@/types/mediaMode";
import getMedia from "@/utils/serverActions/getMedia";
import getUpcoming from "@/utils/serverActions/getUpcoming";

import styles from "./Media.module.css";
import Button from "../Button/Button";
import MediaCard from "../MediaCard/MediaCard";
import UpcomingMedia from "../UpcomingMedia/UpcomingMedia";

interface Props {
	initialMedia: (Movie | TVShow)[];
	mediaMode: MediaMode; // ✅ This should allow ALL values in the enum
}

export default function MediaList({ initialMedia, mediaMode }: Props) {
	const [media, setMedia] = useState<(Movie | TVShow)[]>(initialMedia);
	const [page, setPage] = useState<number>(1);
	const [buttonHidden, setButtonHidden] = useState<boolean>(initialMedia.length === 0);
	const [loading, setLoading] = useState<boolean>(false);

	const loadMoreMedia = async () => {
		setLoading(true);

		const mediaList: (Movie | TVShow)[] =
			mediaMode === MediaMode.UPCOMING
				? await getUpcoming(MediaMode.TV, page + 1)
				: await getMedia(mediaMode, page + 1);

		const newMedia = mediaList.filter(
			(newItem) => !media.some((existingMedia) => existingMedia.id === newItem.id)
		);

		setButtonHidden(mediaList.length === 0);
		setMedia((prevMedia) => [...prevMedia, ...newMedia]);
		setPage((prevPage) => prevPage + 1);
		setLoading(false);
	};

	return (
		<div className={styles.container}>
			<div
				className={
					mediaMode === MediaMode.UPCOMING ? styles.upcomingContainer : styles.mediaContainer
				}>
				{media.map((media) =>
					media.poster_path ? (
						<div key={media.id} className={styles.posterContainer}>
							{mediaMode === MediaMode.UPCOMING ? (
								<div>
									<UpcomingMedia media={media} mediaMode={MediaMode.TV} />
								</div>
							) : (
								<div>
									<MediaCard className={styles.nohover} media={media} mediaMode={mediaMode} />
								</div>
							)}
						</div>
					) : null
				)}
			</div>
			{!buttonHidden && (
				<div className={styles.loadMore}>
					<Button
						icon={loading && <Loader className={styles.animateSpin} />}
						onClick={loadMoreMedia}
						disabled={loading}>
						Load More
					</Button>
				</div>
			)}
		</div>
	);
}
