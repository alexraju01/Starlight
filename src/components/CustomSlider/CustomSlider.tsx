import { Suspense } from "react";
import { Movie } from "@/types/global";
import fetchData from "@/utils/fetchData";
import CustomSliderClient from "./CustomSliderClient";

interface Props {
	endpoint: string;
	title: string;
}

type TrendingMediaResponse = { results: Movie[] };

// Simulated delay function
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const CustomSliderContent = async ({ endpoint, title }: Props) => {
	// Artificial 2-second delay
	// await delay(2000);

	const { results } = await fetchData<TrendingMediaResponse>("3", endpoint);
	return <CustomSliderClient media={results} title={title} />;
};

export default function CustomSlider({ endpoint, title }: Props) {
	return (
		<Suspense fallback={<div>Loading {title}...</div>}>
			<CustomSliderContent endpoint={endpoint} title={title} />
		</Suspense>
	);
}
