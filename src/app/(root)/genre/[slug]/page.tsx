import { Suspense } from "react";

import { MediaCard } from "@/components";
import { Genre } from "@/types/genre";
import { Movie, TVShow } from "@/types/global";
import { MediaMode } from "@/types/mediaMode";
import fetchData from "@/utils/fetchData";

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
		<Suspense fallback={<div className='text-center mt-10'>Loading...</div>}>
			<section className='flex flex-col w-full mt-20'>
				<h2 className='w-full text-[clamp(2rem,5.5vw,4rem)] px-4 font-semibold'>{`Shows related to ${genreName} ...`}</h2>
				<div className='grid w-full gap-8 p-6 grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] transition-all duration-300'>
					{combineRelatedMedia.map((media) => (
						<MediaCard key={media.id} media={media} mediaMode={getMediaMode(media.type)} />
					))}
				</div>
			</section>
		</Suspense>
	);
}
