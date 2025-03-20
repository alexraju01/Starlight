interface MultiMedia {
	id: number;
	title?: string; // Some TV shows use `original_name`, so it’s optional here
	name?: string; // Alternative name for TV shows
	overview: string;
	poster_path: string;
	backdrop_path?: string;
	media_type: "movie" | "tv" | "person"; // Distinguish between movie & TV show
	original_language: string;
	genre_ids: number[];
	popularity: number;
	vote_average: number;
	vote_count: number;
}

interface Movie extends BaseMedia {
	media_type: "movie";
	title: string; // Movies always have a title
	release_date?: string;
	video?: boolean;
}

interface TVShow extends BaseMedia {
	media_type: "tv";
	original_name: string; // Required for TV shows
	first_air_date?: string;
	episode_count?: number;
	seasons?: number;
}

interface MoviesWithLogos extends BaseMedia {
	logoImage?: string; // Optional because some movies may not have a logo
}

export interface Logo {
	aspect_ratio: number;
	height: number;
	iso_639_1: string | null; // Some logos may not have a language code
	file_path: string;
	vote_average: number;
	vote_count: number;
	width: number;
}
