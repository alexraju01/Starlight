import { slugify } from "@/utils/slugify";

export const ROUTES = {
	HOME: "/",

	// Movie route: ID + optional slug
	MOVIE: (id: number, slug?: string) => (slug ? `/movie/${id}-${slugify(slug)}` : `/movie/${id}`),

	// TV route: ID + optional slug
	TV: (id: number, slug?: string) => (slug ? `/tv/${id}-${slugify(slug)}` : `/tv/${id}`),

	// Genre route:  genre Name
	GENRE: (id: number) => `/genre/${id}`,
};
