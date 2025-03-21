import { Genre } from "@/types/genre";

export default function mapGenres(genresArray: Genre[]): Record<number, string> {
	return genresArray.reduce<Record<number, string>>((acc, genre) => {
		acc[genre.id] = genre.name;
		return acc;
	}, {});
}
