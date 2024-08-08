import Icons, { genreIcons } from "@/utils/icons";
import styles from "./genre.module.css";
import fetchData from "@/utils/fetchData";
import Link from "next/link";
import { Suspense } from "react";
import Spinner from "@/components/Spinner/Spinner";

export default async function GenrePage() {
	const [movieGenre, tvGenre] = await Promise.all([
		fetchData(3, "genre/movie/list"),
		fetchData(3, "genre/tv/list"),
	]);
	const combinedGenres = [...movieGenre.genres, ...tvGenre.genres];

	return (
		<section className={styles.container}>
			<h2>List of all the movies</h2>

			<Suspense fallback={<Spinner />}>
				<div className={styles.genreList}>
					{combinedGenres.map((genre) => (
						<Link key={genre.id} href={`/genre/${genre.id}`}>
							<div className={styles.genre}>
								<i>{Icons.genreIcons[genre.name]}</i>
								<p>{genre.name}</p>
							</div>
						</Link>
					))}
				</div>
			</Suspense>
		</section>
	);
}
