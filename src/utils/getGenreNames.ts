import { MoviesWithLogos } from "@/types/global";

export function getGenreNames(
  movie: MoviesWithLogos,
  genres: Record<number, string>
): string {
  return movie.genre_ids?.map((id) => genres[id] || "Unknown").join(", ") ?? "";
}
