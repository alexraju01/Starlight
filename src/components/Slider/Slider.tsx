import fetchData from "../../utils/fetchData";
import MediaCard from "../MediaCard/MediaCard";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../ui/carousel";

import styles from "./Slider.module.css";

interface Props {
	mediaMode: "movie" | "tv";
	endpoint: string;
}

export default async function Home({ mediaMode, endpoint }: Props) {
	const getTopRated = await fetchData("3", endpoint);
	const topRatedMovies = getTopRated.results;

	return (
		<Carousel
			className={styles.carousel}
			opts={{
				align: "start",
			}}>
			<CarouselContent>
				{topRatedMovies.map((topRated, index) =>
					topRated.poster_path ? (
						<CarouselItem key={index} className={`${styles.carouselItem}`}>
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
