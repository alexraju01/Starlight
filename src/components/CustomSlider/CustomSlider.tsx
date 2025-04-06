import { Movie } from "@/types/global";
import fetchData from "@/utils/fetchData";
import CustomSliderClient from "./CustomSliderClient";

interface Props {
  endpoint: string;
  title: string;
}

type TrendingMediaResponse = { results: Movie[] };

const CustomSlider = async ({ endpoint, title }: Props) => {
  const { results } = await fetchData<TrendingMediaResponse>("3", endpoint);

  return <CustomSliderClient media={results} title={title} />;
};

export default CustomSlider;
