// import { genreIcons } from "@/utils/icons";
import styles from "./genre.module.css";
import fetchData from "@/utils/fetchData";
import Link from "next/link";
import Spinner from "@/components/Spinner/Spinner";
import Icons from "@/utils/icons";
import { Suspense } from "react";
import GenreSkeleton from "@/components/LoadingSkeletons/GenreSkeleton";

export default async function GenrePage() {
	// Fetch genres concurrently
	const [{ genres: movieGenres }, { genres: tvGenres }] = await Promise.all([
		fetchData(3, "genre/movie/list"),
		fetchData(3, "genre/tv/list"),
	]);

	// Combine genres into a single array
	const combinedGenres = [...movieGenres, ...tvGenres];
	// console.log(combinedGenres);
	return (
		<section className={styles.container}>
			<h2>List of all the movies</h2>
			<Suspense fallback={<GenreSkeleton />}>
				<div className={styles.genreList}>
					{combinedGenres.map(({ id, name }) => (
						<Link key={id} href={`/genre/${id}`}>
							<div className={styles.genre}>
								<i>{Icons.genreIcons[name]}</i>
								<p>{name}</p>
							</div>
						</Link>
					))}
				</div>
			</Suspense>
		</section>
	);
}
