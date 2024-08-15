// import { Card, CardContent } from "@/components/ui/card";
import styles from "./Slider.module.css";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import fetchData from "@/utils/fetchData";
import Image from "next/image";
import Link from "next/link";
import MediaCard from "../MediaCard/MediaCard";

export default async function Home({ mediaMode, endpoint }) {
	const getTopRated = await fetchData("3", endpoint);
	const topRatedMovies = getTopRated.results;

	return (
		<Carousel
			className={styles.carousel}
			opts={{
				align: "start",
			}}
		>
			<CarouselContent>
				{topRatedMovies.map((topRated, index) =>
					topRated.poster_path ? (
						<CarouselItem key={index} className={`${styles.carouselItem}`}>
							{/* <Link href={`/${mediaMode}/${topRated.id}`}> */}
							<MediaCard className={styles.roundedImage} media={topRated} mediaMode={mediaMode} />
							{/* <Image
									src={`https://image.tmdb.org/t/p/w500${topRated.poster_path}`}
									alt={`Movie Poster ${index}`}
									width={400}
									height={650}
									className={styles.roundedImage}
								/> */}
							{/* </Link> */}
						</CarouselItem>
					) : null
				)}
			</CarouselContent>
			<CarouselPrevious className={styles.button} />
			<CarouselNext />
		</Carousel>
	);
}
