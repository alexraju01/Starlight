// hooks/useAllGenres.ts
import { useEffect, useState } from "react";
import getGenre from "@/utils/genre/getGenre";
import { MediaMode } from "@/types/mediaMode";

type GenreMap = Record<number, string>;

interface AllGenres {
	movie: GenreMap;
	tv: GenreMap;
}

export const useAllGenres = (): AllGenres => {
	const [genreMap, setGenreMap] = useState<AllGenres>({ movie: {}, tv: {} });

	useEffect(() => {
		const fetchAll = async () => {
			try {
				const [movieData, tvData] = await Promise.all([
					getGenre("movie" as MediaMode),
					getGenre("tv" as MediaMode),
				]);

				setGenreMap({
					movie: Object.fromEntries(movieData.genres.map((g) => [g.id, g.name])),
					tv: Object.fromEntries(tvData.genres.map((g) => [g.id, g.name])),
				});
			} catch (err) {
				console.error("Error fetching genre maps:", err);
			}
		};

		fetchAll();
	}, []);

	return genreMap;
};
