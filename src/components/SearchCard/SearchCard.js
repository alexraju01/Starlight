"use client";
import fetchData from "@/utils/fetchData";
import styles from "./SearchCard.module.css";
import { useEffect, useState } from "react";
import getSearch from "@/utils/actions";
import MediaCard from "../MediaCard/MediaCard";
import RatingIcon from "../RatingIcon/RatingIcon";
import Dot from "../Dot/Dot";

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
								<div key={media.id} className={styles.card}>
									<div className={styles.cardImage}>
										<MediaCard key={media.id} media={media} mediaMode={media.media_type} />
									</div>
									<div className={styles.cardDetails}>
										<div>
											<h2>{media.title || media.name}</h2>
										</div>
										<div className={styles.metaData}>
											<RatingIcon className={styles.rate} mediaDetails={media} />
											<Dot className={styles.dot} />
										</div>
									</div>
								</div>
							))
					) : (
						<p>No results found</p>
					)}
				</div>
			) : null}
		</>
	);
}
