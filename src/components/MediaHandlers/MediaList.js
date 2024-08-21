"use client";
import styles from "./Media.module.css";

import Button from "@/components/Button/Button";
import MediaCard from "@/components/MediaCard/MediaCard";
// import UpcomingMedia from "@/components/UpcomingMedia/UpcomingMedia"; // Import the new component
import getMedia from "@/utils/serverActions/getMedia";
import getUpcoming from "@/utils/serverActions/getUpcoming";
import { Loader } from "lucide-react";
import { Suspense, useState } from "react";
import UpcomingMedia from "../UpcomingMedia/Upcoming";
import LoadingSkeletons from "../LoadingSkeletons/LoadingSkeletons";

export default function MediaList({ initialMedia, mediaMode }) {
	const [media, setMedia] = useState(initialMedia);
	const [page, setPage] = useState(1);
	const [buttonHidden, setButtonHidden] = useState(initialMedia.length === 0);
	const [loading, setLoading] = useState(false);

	const loadMoreMedia = async () => {
		setLoading(true);

		const mediaList =
			mediaMode === "upcoming"
				? await getUpcoming("tv", page + 1)
				: await getMedia(mediaMode, page + 1);

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
				<div
					className={mediaMode === "upcoming" ? styles.upcomingContainer : styles.mediaContainer}
				>
					{media.map((media) =>
						media.poster_path ? (
							<div key={media.id} className={styles.posterContainer}>
								{mediaMode === "upcoming" ? (
									// <div className={styles.upComing}>
									<UpcomingMedia media={media} mediaMode={"tv"} />
								) : (
									// </div>
									<MediaCard
										className={styles.nohover}
										media={media}
										mediaMode={mediaMode === "upcoming" ? "tv" : mediaMode}
									/>
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
							disabled={loading}
						>
							Load More
						</Button>
					</div>
				)}
			</div>
	);
}
