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

export default async function Home({ type }) {
	const getTopRated = await fetchData("3", type);

	return (
		<Carousel
			className={styles.carousel}
			opts={{
				align: "start",
			}}
		>
			<CarouselContent>
				{getTopRated.results.map((topRated, index) => (
					<CarouselItem key={index} className={`${styles.carouselItem}`}>
						<Link href={`/movie/${topRated.id}`}>
							<Image
								src={
									topRated.poster_path
										? `https://image.tmdb.org/t/p/original${topRated.poster_path}`
										: `https://image.tmdb.org/t/p/original/`
								}
								alt={`Movie Poster ${index}`}
								width={400}
								height={650}
								className={styles.roundedImage}
							/>
						</Link>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className={styles.button} />
			<CarouselNext />
		</Carousel>
	);
}
