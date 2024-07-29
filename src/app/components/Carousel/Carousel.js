"use client";
import { useState, useEffect } from "react";
import { fetchData } from "@/app/utils/fetchData";
import Image from "next/image";
import styles from "./Carousel.module.css"; // Make sure to create this CSS module
import { getGenre } from "@/app/utils/getGenre";

export default function Carousel() {
	const [TrendingMovies, setTrendingMovies] = useState([]);
	const [genres, setGenres] = useState({});
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		async function getMoviesAndGenres() {
			const [getTrendingMovies, getGenres] = await Promise.all([
				fetchData("3", "trending/movie/day"),
				getGenre("movie"),
			]);

			const genresMap = getGenres.genres.reduce((acc, genre) => {
				acc[genre.id] = genre.name;
				return acc;
			}, {});

			setGenres(genresMap);
			setTrendingMovies(getTrendingMovies.results); // Limiting to 5 movies
		}
		getMoviesAndGenres();
	}, []);

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
							<h2 className={styles.title}>{movie.title || movie.name}</h2>
							<div className={styles.movieStats}>
								<div className={styles.rating}>
									<p className={styles.icon}>IMDb</p>
									<p>{movie.vote_average.toFixed(1)}</p>
								</div>
								<p>{movie.original_language.toUpperCase()}</p>
							</div>
							<p className={styles.genres}>{movie.genre_ids.map((id) => genres[id]).join(", ")}</p>
							<button className={styles.watchBtn}>Watch</button>
						</div>
						<div className={styles.imageContainer}>
							<Image
								src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
								layout="fill"
								alt={movie.title || movie.name}
								className={styles.image}
							/>
							<div className={styles.fadeLeft}></div>
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
