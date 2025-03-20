// FetchGenres.js (This will be a server component)
import styles from "./genre.module.css";
import fetchData from "../../../utils/fetchData";
import Link from "next/link";
import Icons, { GenreKey } from "../../../utils/icons";
import { Genre } from "@/types/genre";
import { FaQuestionCircle } from "react-icons/fa";

// Server Component (async component)
export default async function FetchGenres() {
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
