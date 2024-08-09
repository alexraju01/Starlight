"use client";
import { useState, useEffect, useCallback, useMemo, Suspense } from "react";
import Image from "next/image";
import styles from "./Carousel.module.css";
import fetchData from "@/utils/fetchData";
import getGenre from "@/utils/getGenre";
import mapGenres from "@/utils/mapGenre";

export default function Carousel({ mediaMode }) {
	const [trendingMovies, setTrendingMovies] = useState([]);
	const [genres, setGenres] = useState({});
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const fetchGenres = async () => {
			try {
				const genreData = await getGenre(mediaMode);
				setGenres(mapGenres(genreData.genres));
			} catch (error) {
				console.error("Error fetching genres:", error);
			}
		};

		fetchGenres();
	}, [mediaMode]);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const { results: trendingMedia } = await fetchData("3", `trending/${mediaMode}/day`);

				const moviesWithLogos = await Promise.all(
					trendingMedia.slice(0, 10).map(async (movie) => {
						const movieDetails = await fetchData(3, `/${mediaMode}/${movie.id}/images`);
						const logoImage = movieDetails.logos.find((logo) => logo.iso_639_1 === "en");
						return {
							...movie,
							logoImage: logoImage ? `https://image.tmdb.org/t/p/w300${logoImage.file_path}` : null,
						};
					})
				);

				setTrendingMovies(moviesWithLogos);
			} catch (error) {
				console.error("Error fetching trending movies:", error);
			}
		};

		fetchMovies();
	}, [mediaMode]);

	const handlePrev = useCallback(() => {
		setCurrentIndex((prevIndex) => (prevIndex === 0 ? trendingMovies.length - 1 : prevIndex - 1));
	}, [trendingMovies.length]);

	const handleNext = useCallback(() => {
		setCurrentIndex((prevIndex) => (prevIndex === trendingMovies.length - 1 ? 0 : prevIndex + 1));
	}, [trendingMovies.length]);

	const genreNames = useMemo(() => {
		return (movie) => movie.genre_ids.map((id) => genres[id]).join(", ");
	}, [genres]);

	return (
		<div className={styles.carousel}>
			<button className={styles.navButton} onClick={handlePrev} aria-label="Previous slide">
				<p>{"<"}</p>
			</button>
			<ul
				className={styles.carouselList}
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}
				key={mediaMode}
			>
				{trendingMovies.map((movie, index) => (
					<li
						key={movie.id}
						className={styles.slide}
						data-active={index === currentIndex ? true : undefined}
					>
						<div className={styles.info}>
							{movie.logoImage && (
								<div className={styles.logoContainer}>
									<Image
										src={movie.logoImage}
										fill
										quality={50}
										alt={`${movie.title || movie.name} logo`}
										className={styles.logoImage}
									/>
								</div>
							)}
							<p className={styles.genres}>{genreNames(movie)}</p>
						</div>
						<div className={styles.imageContainer}>
							<Image
								src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
								layout="fill"
								alt={movie.title || movie.name}
								className={styles.image}
								priority={index === 0} // Prioritize the first image
							/>
							<div className={styles.fadeLeft}>
								<div>
									{movie.logoImage && (
										<div className={styles.logoContainer}>
											<Image
												src={movie.logoImage}
												fill
												quality={60}
												alt={`${movie.title || movie.name} logo`}
												className={styles.logoImage}
											/>
										</div>
									)}
									<p className={styles.summary}>{movie.overview}</p>
									<button className={styles.detailBtn}>More Details</button>
								</div>
							</div>
						</div>
					</li>
				))}
			</ul>
			<button className={styles.navButton} onClick={handleNext} aria-label="Next slide">
				<p>{">"}</p>
			</button>
		</div>
	);
}
