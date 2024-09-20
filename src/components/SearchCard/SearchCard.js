"use client";
import styles from "./SearchCard.module.css";
import { useEffect, useState } from "react";
import MediaCard from "../MediaCard/MediaCard";
import RatingIcon from "../RatingIcon/RatingIcon";
import Dot from "../Dot/Dot";
import { dateConverter } from "../../utils/dateConverter";
import Link from "next/link";
import getSearch from "../../utils/serverActions/getSearch";

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
							.filter(({ media_type }) => media_type !== "person") // Destructured media_type
							.map(
								({
									id,
									media_type,
									title,
									name,
									release_date,
									first_air_date,
									vote_average,
									poster_path,
								}) => (
									<Link key={id} className={styles.card} href={`/${media_type}/${id}`}>
										<div className={styles.cardImage}>
											<MediaCard
												key={id}
												media={{ id, title, name, poster_path }}
												mediaMode={media_type}
											/>
										</div>
										<div className={styles.cardDetails}>
											<div>
												<h2>{title || name}</h2>
											</div>
											<div className={styles.metaData}>
												<RatingIcon className={styles.rate} vote={vote_average} />
												<Dot />
												<p>{media_type}</p>
												<Dot />
												<p className={styles.date}>
													{dateConverter(release_date || first_air_date)}
												</p>
											</div>
										</div>
									</Link>
								)
							)
					) : (
						<p>No results found</p>
					)}
				</div>
			) : null}
		</>
	);
}
