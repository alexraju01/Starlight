import { APIResponse, Media, Movie, TVShow } from "@/types/global";
import CustomSliderClient from "./CustomSliderClient";
import { MediaMode } from "@/types/mediaMode";
import { fetchData } from "@/utils";

interface Props {
	endpoint: string;
	title: string;
	mediaMode: MediaMode;
}

const CustomSlider = async ({ endpoint, title, mediaMode }: Props) => {
	const { results } = await fetchData<{ results: Movie[] }>("3", endpoint);

	const mediaWithDetails: Media[] = await Promise.all(
		results.map(async (item) => {
			if (mediaMode === MediaMode.TV) {
				const { number_of_seasons } = await fetchData<TVShow>("3", `tv/${item.id}`);
				return { ...item, media_type: "tv", number_of_seasons };
			}
			return { ...item, media_type: "movie" };
		})
	);

	return <CustomSliderClient media={mediaWithDetails} title={title} mediaMode={mediaMode} />;
};

export default CustomSlider;
