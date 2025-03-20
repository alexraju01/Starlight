// interface MultiMedia {
// 	id: number;
// 	title?: string; // Some TV shows use `original_name`, so it’s optional here
// 	name?: string; // Alternative name for TV shows
// 	overview: string;
// 	poster_path: string;
// 	backdrop_path?: string;
// 	media_type: "movie" | "tv" | "person"; // Distinguish between movie & TV show
// 	original_language: string;
// 	genre_ids: number[];
// 	popularity: number;
// 	vote_average: number;
// 	vote_count: number;
// }

// interface Movie extends BaseMedia {
// 	media_type: "movie";
// 	title: string; // Movies always have a title
// 	release_date?: string;
// 	video?: boolean;
// }

// interface TVShow extends BaseMedia {
// 	media_type: "tv";
// 	original_name: string; // Required for TV shows
// 	first_air_date?: string;
// 	episode_count?: number;
// 	seasons?: {
// 		id: number;
// 		name: string;
// 		overview: string;
// 		poster_path?: string;
// 		season_number: number;
// 		episode_count: number;
// 	}[];
// }

// Base interface for shared properties
// Minimal Base Interface (Only Truly Shared Fields)
interface BaseMedia {
	id: number;
	media_type: "movie" | "tv"; // Moved from child interfaces to BaseMedia
	title?: string; // Either 'title' (for movies) or 'name' (for TV)
	name?: string;
	overview: string;
	popularity: number;
	vote_average: number;
	vote_count: number;
	backdrop_path: string | null;
	poster_path: string | null;
	genres: Genre[];
	original_language: string;
	production_countries: ProductionCountry[];
}

// Movie-specific fields
interface Movie extends BaseMedia {
	title: string; // Required for movies
	original_title: string;
	release_date: string;
	runtime: number;
	budget: number;
	revenue: number;
	imdb_id: string;
	video: boolean;
	origin_country: string[];
}

// TV-Series-specific fields
interface TVSeries extends BaseMedia {
	name: string; // Required for TV shows
	original_name: string;
	first_air_date: string;
	last_air_date: string;
	in_production: boolean;
	number_of_seasons: number;
	number_of_episodes: number;
	episode_run_time: number[];
	seasons: Season[];
	networks: Network[];
	created_by: Creator[];
	last_episode_to_air: Episode;
	next_episode_to_air: Episode;
	origin_country: string[];
	type: string;
}

// Unified media type for API responses
type Media = Movie | TVSeries;

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

type MultiMedia = Movie | TVSeries;
