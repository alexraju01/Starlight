import { MediaMode } from "@/types/mediaMode";
import { slugify } from "@/utils/string/slugify";

export const ROUTES = {
	HOME: "/",

	// Movie route: ID + optional slug
	MOVIE: (id: number, slug?: string) => (slug ? `/movie/${id}-${slugify(slug)}` : `/movie/${id}`),

	// TV route: ID + optional slug
	TV: (id: number, slug?: string) => (slug ? `/tv/${id}-${slugify(slug)}` : `/tv/${id}`),

	// Unified route based on mediaMode
	MEDIA: (mediaMode: MediaMode, id: number, slug?: string) =>
		mediaMode === "movie" ? ROUTES.MOVIE(id, slug) : ROUTES.TV(id, slug),

	// Genre route
	GENRE: (id: number) => `/genre/${id}`,

	DISCOVER: (slug: string) => `discover?search=${slugify(slug)}`,
};
