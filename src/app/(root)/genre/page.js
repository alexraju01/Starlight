import styles from "./genre.module.css";
import fetchData from "../../../utils/fetchData";
import Link from "next/link";
import Icons from "../../../utils/icons";
import { Suspense } from "react";
import GenreSkeleton from "../../../components/LoadingSkeletons/GenreSkeleton";

// Fetch genres concurrently in a separate component
async function FetchGenres() {
	const [{ genres: movieGenres }, { genres: tvGenres }] = await Promise.all([
		fetchData(3, "genre/movie/list"),
		fetchData(3, "genre/tv/list"),
	]);

	// Combine genres into a single array
	const combinedGenres = [...movieGenres, ...tvGenres];
	const uniqueGenres = Array.from(
		new Map(combinedGenres.map((genre) => [genre.id, genre])).values()
	).sort((a, b) => a.name.localeCompare(b.name));

	return (
		<div className={styles.genreList}>
			{uniqueGenres.map(({ id, name }) => (
				<Link key={id} href={`/genre/${id}`}>
					<div className={styles.genre}>
						<i>{Icons.genreIcons[name]}</i>
						<p>{name}</p>
					</div>
				</Link>
			))}
		</div>
	);
}

// Client component
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
