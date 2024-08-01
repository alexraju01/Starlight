"use client";
import Image from "next/image";
import styles from "./MediaCard.module.css";
import Link from "next/link";

export default function MediaCard({ media, mediaMode }) {
	return (
		<Link href={`/${mediaMode}/${media.id}`}>
			<div className={styles.mediaCard}>
				<Image
					className={styles.img}
					src={
						media.poster_path
							? `https://image.tmdb.org/t/p/original${media.poster_path}`
							: `https://image.tmdb.org/t/p/original/`
					}
					width={70}
					height={105}
					// quality={100}
					layout="responsive"
					alt={media.title}
				/>
			</div>
		</Link>
	);
}
