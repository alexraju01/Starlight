import { Media, Movie, TVShow } from "@/types/global";

// Utility type guards
export function isMovie(media: Media): media is Movie {
	return (media as Movie).media_type === "movie";
}

export function isTVShow(media: Media): media is TVShow {
	return (media as TVShow).media_type === "tv";
}
