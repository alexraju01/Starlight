// FetchGenres.js (This will be a server component)
import styles from "./genre.module.css";
import fetchData from "../../../utils/fetchData";
import Link from "next/link";
import Icons from "../../../utils/icons";

// Server Component (async component)
export default async function FetchGenres() {
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
