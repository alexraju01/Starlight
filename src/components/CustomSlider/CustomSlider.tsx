import fetchData from "@/utils/fetchData";
import { Movie } from "@/types/global";
import CustomSliderClient from "./CustomSliderClient";
import { MediaMode } from "@/types/mediaMode";
// import CustomSliderClient from "./CustomSliderClient";

type TrendingMediaResponse = { results: Movie[] };
interface Props {
	endpoint: string;
	title: string;
	mediaMode: MediaMode;
}

const CustomSlider = async ({ endpoint, title, mediaMode }: Props) => {
	const { results } = await fetchData<TrendingMediaResponse>("3", endpoint);

	return <CustomSliderClient media={results} title={title} mediaMode={mediaMode} />;
};

export default CustomSlider;
