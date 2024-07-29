import { fetchData } from "@/app/utils/fetchData";
import styles from "./LatestMovies.module.css";
import Slider from "../Slider/Slider";
// import ImageSlider from "../ImageSlider/ImageSlider";
export default async function LatestMovies() {
	const getTopRated = await fetchData("3", "movie/top_rated");

	const movieImg = [];

	getTopRated.results.map((movie) => {
		// Assuming the image path needs to be appended to a base URL
		const imageUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
		movieImg.push(imageUrl);
	});
	return (
		<div className={styles.container}>
			<p>Top Rated</p>
			<Slider />
			{/* <ImageSlider images={movieImg} /> */}
		</div>
	);
}
