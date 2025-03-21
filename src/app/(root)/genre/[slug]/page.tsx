import { Suspense } from "react";

import { MediaCard } from "@/components";
import { Genre } from "@/types/genre";
import { Movie, TVShow } from "@/types/global";
import { MediaMode } from "@/types/mediaMode";
import fetchData from "@/utils/fetchData";

import styles from "./genreMediaList.module.css";
// import MediaCard from "../../../../components/MediaCard/MediaCard";
// import fetchData from "../../../../utils/fetchData";

interface Props {
	params: Promise<{ slug: string }>;
}

interface GenreResponse {
	genres: Genre[];
}

interface MediaResponse {
	page: number;
	results: (Movie | TVShow)[];
	total_pages: number;
	total_results: number;
}

const getMediaMode = (type: string): MediaMode => {
	switch (type) {
		case "movie":
			return MediaMode.Movie;
		case "tv":
			return MediaMode.TV;
		default:
			throw new Error(`Unknown media type: ${type}`);
	}
};

export default async function Page({ params }: Props) {
	const { slug } = await params;
	const [movieGenre, tvGenre, genreRelatedMovies, genreRelatedTv] = await Promise.all([
		fetchData<GenreResponse>("3", "genre/movie/list"),
		fetchData<GenreResponse>("3", "genre/tv/list"),
		fetchData<MediaResponse>("3", `discover/movie?with_genres=${slug}`),
		fetchData<MediaResponse>("3", `discover/tv?with_genres=${slug}`),
	]);

	const combineRelatedMedia = [
		...genreRelatedMovies.results.map((media) => ({ ...media, type: "movie" })),
		...genreRelatedTv.results.map((media) => ({ ...media, type: "tv" })),
	];

	const combineRelatedGenre = [...movieGenre.genres, ...tvGenre.genres];

	const foundGenre = combineRelatedGenre.find((item) => item.id === parseInt(slug));
	const genreName = foundGenre ? foundGenre.name : "Unknown Genre";

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<section className={styles.container}>
				<h2>{`Shows related to ${genreName} ...`}</h2>
				<div className={styles.cardContainer}>
					{combineRelatedMedia.map((media) => (
						<MediaCard key={media.id} media={media} mediaMode={getMediaMode(media.type)} />
					))}
				</div>
			</section>
		</Suspense>
	);
}
