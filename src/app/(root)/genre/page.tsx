import Link from "next/link";
import { Suspense } from "react";
import { FaQuestionCircle } from "react-icons/fa";

import GenreSkeleton from "@/components/LoadingSkeletons/GenreSkeleton";
import { Genre } from "@/types/genre";
import fetchData from "@/utils/fetchData";
import Icons, { GenreKey } from "@/utils/icons";

import styles from "./genre.module.css";

// Server Component (async component)
async function FetchGenres() {
	const [{ genres: movieGenres }, { genres: tvGenres }] = await Promise.all([
		fetchData<{ genres: Genre[] }>("3", "genre/movie/list"),
		fetchData<{ genres: Genre[] }>("3", "genre/tv/list"),
	]);

	// Combine genres into a single array
	const combinedGenres = [...movieGenres, ...tvGenres];
	const uniqueGenres = Array.from(
		new Map(combinedGenres.map((genre) => [genre.id, genre])).values()
	).sort((a, b) => a.name.localeCompare(b.name));

	return (
		<div className={styles.genreList}>
			{uniqueGenres.map(({ id, name }) => {
				const icon = Icons.genreIcons[name as GenreKey] ?? <FaQuestionCircle />;
				return (
					<Link key={id} href={`/genre/${id}`}>
						<div className={styles.genre}>
							<i>{icon}</i>
							<p>{name}</p>
						</div>
					</Link>
				);
			})}
		</div>
	);
}

export default function GenrePage() {
	return (
		<section className={styles.container}>
			<h2>List of all the movies</h2>
			<Suspense fallback={<GenreSkeleton />}>
				<FetchGenres />
			</Suspense>
		</section>
	);
}
