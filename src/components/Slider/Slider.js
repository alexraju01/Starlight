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
// } from "../../components/ui/carousel";
// import { fetchData } from "@/utils/fetchData";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
	const getTopRated = await fetchData("3", "movie/top_rated");

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
						<Link href={`/movies/${topRated.id}`}>
							<CarouselItem>
								<Image
									src={`https://image.tmdb.org/t/p/original${topRated.poster_path}`}
									alt={`Movie Poster ${index}`}
									width={400}
									height={650}
									className={styles.roundedImage}
								/>
							</CarouselItem>
						</Link>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className={styles.button} />
			<CarouselNext />
		</Carousel>
	);
}
