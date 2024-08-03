// "use client";
// import Image from "next/image";
// import styles from "./MediaCard.module.css";
// import Link from "next/link";

// export default function MediaCard({ media, mediaMode }) {
// 	return (
// 		<Link href={`/${mediaMode}/${media.id}`}>
// 			<div className={styles.mediaCard}>
// 				<Image
// 					className={styles.img}
// 					src={
// 						media.poster_path
// 							? `https://image.tmdb.org/t/p/original${media.poster_path}`
// 							: `https://image.tmdb.org/t/p/original/`
// 					}
// 					width={70}
// 					height={105}
// 					layout="responsive"
// 					priority={true} // Ensures that the image is loaded quickly
// 					loading="eager" // Load image as soon as possible
// 					alt={media.title}
// 				/>
// 			</div>
// 		</Link>
// 	);
// }

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./MediaCard.module.css";
import Link from "next/link";

export default function MediaCard({ media, mediaMode }) {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		// Logic to handle loading state and animation until the image is fully loaded
		if (!media.poster_path) {
			setIsLoaded(true);
		}
	}, [media.poster_path]);

	return (
		<Link href={`/${mediaMode}/${media.id}`}>
			<div className={styles.mediaCard}>
				{!isLoaded && <div className={styles.pulse}></div>}
				<Image
					className={`${styles.img} ${isLoaded ? styles.loaded : ""}`}
					src={
						media.poster_path
							? `https://image.tmdb.org/t/p/original${media.poster_path}`
							: `https://image.tmdb.org/t/p/original/`
					}
					width={70}
					height={105}
					layout="responsive"
					alt={media.title}
					priority={true}
					loading="eager"
					onLoadingComplete={() => setIsLoaded(true)}
				/>
			</div>
		</Link>
	);
}
