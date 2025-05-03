import fetchData from "@/utils/fetchData";
import GenreControls from "./GenreControls"; // client component
import { APIResponse } from "@/types/global";
import { Genre } from "@/types/genre";

const GenreCollection = async () => {
	const { genres }: { genres: Genre[] } = await fetchData("3", "/genre/movie/list");

	const genreMovies = await Promise.all(
		genres.map(async (genre) => {
			const data = await fetchData<APIResponse>(
				"3",
				`discover/movie?with_genres=${genre.id}&sort_by=popularity.desc`
			);
			return {
				...genre,
				movies: data.results.slice(0, 4),
			};
		})
	);

	return (
		<section className='relative z-2 mb-[80px] '>
			<GenreControls genreMovies={genreMovies} />
		</section>
	);
};

export default GenreCollection;
