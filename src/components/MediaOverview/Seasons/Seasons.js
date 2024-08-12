"use client";
import Image from "next/image";
import styles from "./Seasons.module.css";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import Icons from "@/utils/icons";
import ImageWithFallback from "@/components/BrokenImage/ImageWithFallback";
import { Suspense } from "react";
export default function Seasons({ seasons }) {
	const plural = seasons.length === 1 || 0 ? "Season" : "Seasons";

	if (!seasons || seasons.length === 0) return null; // Return null if there are no seasons to display

	return (
		<section className={styles.container}>
			<Suspense fallback={<div>Loading season. . . </div>}>
				<SectionHeading icon={Icons.play}>{`${plural} (${seasons.length})`}</SectionHeading>
				<div className={styles.seasonContainer}>
					{seasons.map(({ id, poster_path, name }) => (
						<div key={id} className={styles.season}>
							<div className={styles.seasonPoster}>
								<ImageWithFallback
									className={styles.image}
									src={
										poster_path
											? `https://image.tmdb.org/t/p/w342${poster_path}`
											: `https://image.tmdb.org/t/p/w185/`
									}
									alt={name}
								/>

								{/* <Image src={`https://image.tmdb.org/t/p/w342${poster_path}`} fill alt={name} /> */}
							</div>
							<p>{name}</p>
						</div>
					))}
				</div>
			</Suspense>
		</section>
	);
}
