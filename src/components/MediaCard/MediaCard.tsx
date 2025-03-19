"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./MediaCard.module.css";
import Link from "next/link";

interface Props {
	media: Movie | TVShow;
	mediaMode: "movie" | "tv";
	className: string;
}

export default function MediaCard({ media, mediaMode, className }: Props) {
	const [isLoaded, setIsLoaded] = useState(false);

	const { id, name, title, poster_path } = media;
	const displayName = title || name;
	console.log(displayName);
	useEffect(() => {
		// Logic to handle loading state and animation until the image is fully loaded
		if (!poster_path) setIsLoaded(true);
	}, [poster_path]);

	return (
		<Link href={`/${mediaMode}/${id}`}>
			<div className={`${styles.mediaCard} ${className}`}>
				{!isLoaded && <div className={styles.pulse}></div>}
				<Image
					className={`${styles.img} ${isLoaded ? styles.loaded : ""}`}
					src={
						poster_path
							? `https://image.tmdb.org/t/p/w342${poster_path}`
							: `https://image.tmdb.org/t/p/w342/`
					}
					width={70}
					height={105}
					layout='responsive'
					alt={displayName ?? "Image poster"}
					priority
					onLoad={() => setIsLoaded(true)}
				/>
			</div>
		</Link>
	);
}
