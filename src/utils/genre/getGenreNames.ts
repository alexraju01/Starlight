import { MoviesWithLogos } from "@/types/global";

export default function getGenreNames(
	movie: MoviesWithLogos,
	genres: Record<number, string>
): string {
	return movie.genre_ids?.map((id) => genres[id] || "Unknown").join(" • ") ?? "";
}
