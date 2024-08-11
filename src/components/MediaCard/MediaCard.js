"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./MediaCard.module.css";
import Link from "next/link";

export default function MediaCard({ media, mediaMode }) {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		// Logic to handle loading state and animation until the image is fully loaded
		if (!media.poster_path) setIsLoaded(true);
	}, [media.poster_path]);

	return (
		<Link href={`/${mediaMode}/${media.id}`}>
			<div className={styles.mediaCard}>
				{!isLoaded && <div className={styles.pulse}></div>}
				<Image
					className={`${styles.img} ${isLoaded ? styles.loaded : ""}`}
					src={
						media.poster_path
							? `https://image.tmdb.org/t/p/w342${media.poster_path}`
							: `https://image.tmdb.org/t/p/w342/`
					}
					width={70}
					height={105}
					layout="responsive"
					alt={media.title}
					priority={true}
					// loading="lazy"
					onLoadingComplete={() => setIsLoaded(true)}
				/>
			</div>
		</Link>
	);
}
