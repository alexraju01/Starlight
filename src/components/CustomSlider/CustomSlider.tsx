import fetchData from "@/utils/fetchData";
import { Movie } from "@/types/global";
import CustomSliderClient from "./CustomSliderClient";
// import CustomSliderClient from "./CustomSliderClient";

type TrendingMediaResponse = { results: Movie[] };
interface Props {
	endpoint: string;
	title: string;
}

const CustomSlider = async ({ endpoint, title }: Props) => {
	const { results } = await fetchData<TrendingMediaResponse>("3", endpoint);

	return <CustomSliderClient media={results} title={title} />;
};

export default CustomSlider;
