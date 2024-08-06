import Icons, { genreIcons } from "@/utils/icons";
import styles from "./genre.module.css";
import fetchData from "@/utils/fetchData";
import Image from "next/image";

export default async function GenrePage() {
	const [movieGenre, tvGenre] = await Promise.all([
		fetchData(3, "genre/movie/list"),
		fetchData(3, "genre/tv/list"),
	]);
	const combinedGenres = [...movieGenre.genres, ...tvGenre.genres];

	// console.log(Icons.genreIcons.Action);

	return (
		<section className={styles.container}>
			<h2>List of all the movies</h2>

			<div className={styles.genreList}>
				{combinedGenres.map((genre) => (
					<div key={genre.id} className={styles.genre}>
						<i>{Icons.genreIcons[genre.name]}</i>
						<p>{genre.name}</p>
					</div>
				))}
			</div>
		</section>
	);
}
