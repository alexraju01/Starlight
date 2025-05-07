import fetchData from "@/utils/fetchData";
import { APIResponse, Movie, TVShow } from "@/types/global";
import CustomSliderClient from "./CustomSliderClient";
import { MediaMode } from "@/types/mediaMode";

type TrendingMediaResponse = { results: Movie[] };

// interface TVShowDetails extends Movie {
// 	seasons?: any[]; // You can define a more specific type if needed
// }

interface Props {
	endpoint: string;
	title: string;
	mediaMode: MediaMode;
}

const CustomSlider = async ({ endpoint, title, mediaMode }: Props) => {
	const { results } = await fetchData<TrendingMediaResponse>("3", endpoint);

	let enrichedResults: (Movie | TVShow)[] = [];

	if (mediaMode === MediaMode.TV) {
		// Fetch additional TV show details including seasons
		enrichedResults = await Promise.all(
			results.map(async (item) => {
				const details = await fetchData<TVShow>("3", `tv/${item.id}`);
				return {
					...item,
					media_type: "tv",
					number_of_seasons: details.number_of_seasons,
				};
			})
		);
	} else {
		// For movies, just add media_type
		enrichedResults = results.map((item) => ({
			...item,
			media_type: "movie",
		}));
	}

	return <CustomSliderClient media={enrichedResults} title={title} mediaMode={mediaMode} />;
};

export default CustomSlider;
