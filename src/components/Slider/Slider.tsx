import { APIResponse, Media } from "@/types/global";
import { MediaMode } from "@/types/mediaMode";

import styles from "./Slider.module.css";
import fetchData from "../../utils/fetchData";
import MediaCard from "../MediaCard/MediaCard";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../ui/carousel";

interface Props {
	mediaMode: MediaMode;
	endpoint: string;
}

export default async function Home({ mediaMode, endpoint }: Props) {
	const getTopRated = await fetchData<APIResponse>("3", endpoint);
	const topRatedMovies = getTopRated.results;

	return (
		<Carousel
			className={styles.carousel}
			opts={{
				align: "start",
			}}>
			<CarouselContent>
				{topRatedMovies.map((topRated: Media) =>
					topRated.poster_path ? (
						<CarouselItem key={topRated.id} className={`${styles.carouselItem}`}>
							<MediaCard className={styles.roundedImage} media={topRated} mediaMode={mediaMode} />
						</CarouselItem>
					) : null
				)}
			</CarouselContent>
			<CarouselPrevious className={styles.button} />
			<CarouselNext />
		</Carousel>
	);
}
