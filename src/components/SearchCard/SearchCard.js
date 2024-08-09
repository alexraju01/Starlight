"use client";
import fetchData from "@/utils/fetchData";
import styles from "./SearchCard.module.css";
import { useEffect, useState } from "react";
// import getSearch from "@/utils/getSearch";
import MediaCard from "../MediaCard/MediaCard";
import RatingIcon from "../RatingIcon/RatingIcon";
import Dot from "../Dot/Dot";
import { dateConverter } from "@/utils/dateConverter";
import Link from "next/link";
import getSearch from "@/utils/serverActions/getSearch";

export default function SearchCard({ query }) {
	const [result, setResult] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			if (query) {
				const info = await getSearch(query);
				setResult(info.slice(0, 4));
			}
		};
		fetchData();
	}, [query]);

	return (
		<>
			{query.length > 1 ? (
				<div className={styles.searchResults}>
					{result.length > 0 ? (
						result
							.filter((media) => media.media_type !== "person") // Filter out "person" media types
							.map((media) => (
								<Link
									key={media.id}
									className={styles.card}
									href={`/${media.media_type}/${media.id}`}
								>
									{/* <div className={styles.card}> */}
									<div className={styles.cardImage}>
										<MediaCard key={media.id} media={media} mediaMode={media.media_type} />
									</div>
									<div className={styles.cardDetails}>
										<div>
											<h2>{media.title || media.name}</h2>
										</div>
										<div className={styles.metaData}>
											<RatingIcon className={styles.rate} mediaDetails={media} />
											<Dot />
											<p>{media.media_type}</p>
											<Dot />
											<p className={styles.date}>
												{dateConverter(media.release_date || media.first_air_date)}
											</p>
										</div>
									</div>
									{/* </div> */}
								</Link>
							))
					) : (
						<p>No results found</p>
					)}
				</div>
			) : null}
		</>
	);
}
