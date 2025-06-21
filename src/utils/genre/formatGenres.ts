import { isGenreMovie } from "@/utils/typeGuard";
import { Media } from "@/types/global";

export default function formatGenres(item: Media, genreMap: Record<number, string>): string {
	if (!isGenreMovie(item) || !item.genre_ids) return "Unknown genre";

	return item.genre_ids
		.map((id) => (genreMap[id] === "Science Fiction" ? "Sci-Fi" : genreMap[id]))
		.filter(Boolean)
		.join(", ");
}
