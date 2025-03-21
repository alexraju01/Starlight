"use client";
import styles from "./SearchCard.module.css";
import { useEffect, useState } from "react";
import MediaCard from "../MediaCard/MediaCard";
import RatingIcon from "../RatingIcon/RatingIcon";
import Dot from "../Dot/Dot";
import { dateConverter } from "../../utils/dateConverter";
import Link from "next/link";
import getSearch from "../../utils/serverActions/getSearch";
import { MediaMode } from "@/types/mediaMode"; // ✅ Ensure MediaMode is used
import { SearchMedia } from "@/types/searchMedia";

interface Props {
	query: string;
}

export default function SearchCard({ query }: Props) {
	const [result, setResult] = useState<SearchMedia[]>([]); // ✅ Use the new interface

	useEffect(() => {
		const fetchData = async () => {
			if (query.trim().length > 1) {
				const info: SearchMedia[] = await getSearch(query);
				setResult(info.slice(0, 4));
			}
		};
		fetchData();
	}, [query]);

	return (
		<>
			{query.length > 1 && (
				<div className={styles.searchResults}>
					{result.length > 0 ? (
						result
							.filter(({ media_type }) => media_type !== "person")
							.map((media) => (
								<Link
									key={media.id}
									className={styles.card}
									href={`/${media.media_type}/${media.id}`}>
									<div className={styles.cardImage}>
										<MediaCard media={media} mediaMode={media.media_type} />
									</div>
									<div className={styles.cardDetails}>
										<div>
											<h2>{media.title || media.name}</h2>
										</div>
										<div className={styles.metaData}>
											<RatingIcon className={styles.rate} vote={media.vote_average ?? 0} />
											<Dot />
											<p>{media.media_type}</p>
											<Dot />
											<p className={styles.date}>
												{dateConverter(media.release_date ?? media.first_air_date ?? "N/A")}
											</p>
										</div>
									</div>
								</Link>
							))
					) : (
						<p>No results found</p>
					)}
				</div>
			)}
		</>
	);
}
