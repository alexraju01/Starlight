import { Movie } from "@/types/global";
import fetchData from "@/utils/fetchData";
import CustomSliderClient from "./CustomSliderClient";

interface Props {
  endpoint: string;
}

type TrendingMediaResponse = { results: Movie[] };

const CustomSlider = async ({ endpoint }: Props) => {
  const { results } = await fetchData<TrendingMediaResponse>("3", endpoint);

  return <CustomSliderClient media={results} />;
};

export default CustomSlider;
