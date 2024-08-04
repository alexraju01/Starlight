"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Carousel.module.css";
import fetchData from "@/utils/fetchData";
import getGenre from "@/utils/getGenre";

export default function Carousel({ mediaMode }) {
	const [TrendingMovies, setTrendingMovies] = useState([]);
	const [genres, setGenres] = useState({});
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		async function getMoviesAndGenres() {
			const [getTrendingMedia, getGenres] = await Promise.all([
				fetchData("3", `trending/${mediaMode}/day`),
				getGenre("movie"),
			]);

			// Fetch movie logos and add to movie details
			const moviesWithLogos = await Promise.all(
				getTrendingMedia.results.slice(0, 10).map(async (movie) => {
					const movieDetails = await fetchData(3, `/${mediaMode}/${movie.id}/images`);
					const logoImage = movieDetails.logos.find((logo) => logo.iso_639_1 === "en");
					return {
						...movie,
						logoImage: logoImage
							? `https://image.tmdb.org/t/p/original${logoImage.file_path}`
							: null,
					};
				})
			);

			const genresMap = getGenres.genres.reduce((acc, genre) => {
				acc[genre.id] = genre.name;
				return acc;
			}, {});

			setGenres(genresMap);
			setTrendingMovies(moviesWithLogos);
		}

		getMoviesAndGenres();
	}, [mediaMode]);

	const handlePrev = () => {
		setCurrentIndex((prevIndex) => (prevIndex === 0 ? TrendingMovies.length - 1 : prevIndex - 1));
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex === TrendingMovies.length - 1 ? 0 : prevIndex + 1));
	};

	return (
		<div className={styles.carousel}>
			<button className={styles.navButton} onClick={handlePrev}>
				<p>{"<"}</p>
			</button>
			<ul
				className={styles.carouselList}
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}
			>
				{TrendingMovies.map((movie, index) => (
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
							<p className={styles.genres}>{movie.genre_ids.map((id) => genres[id]).join(", ")}</p>
						</div>
						<div className={styles.imageContainer}>
							<Image
								src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
								layout="fill"
								alt={movie.title || movie.name}
								className={styles.image}
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
			<button className={styles.navButton} onClick={handleNext}>
				<p>{">"}</p>
			</button>
		</div>
	);
}
