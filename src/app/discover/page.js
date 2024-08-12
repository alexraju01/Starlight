"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import fetchData from "@/utils/fetchData";
import MovieGrid from "@/components/MovieGrid/MovieGrid";
import Spinner from "@/components/Spinner/Spinner";

export default function DisoverPage() {
	const [query, setQuery] = useState("");
	const [movies, setMovies] = useState([]);
	const inputRef = useRef(null);

	useEffect(() => {
		if (inputRef.current) inputRef.current.focus(); // Focus on the input element when the component mounts
	}, []);

	useEffect(() => {
		const loadMovies = async () => {
			if (query) {
				const results = await fetchData(3, `search/multi?query=${query}`);
				setMovies(results.results.filter((media) => media.media_type !== "person"));
			}
		};
		loadMovies();
	}, [query]); // Add query as a dependency

	async function handleSearch(e) {
		e.preventDefault();
		if (!query) return;
		const results = await fetchData(3, `search/multi?query=${query}`);
		setMovies(results.results.filter((media) => media.media_type !== "person"));
	}

	return (
		<div className={styles.container}>
			<h2>Discover More Movies...</h2>
			<form className={styles.form} onSubmit={handleSearch}>
				<input
					className={styles.searchBox}
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search..."
					ref={inputRef}
				/>
				<button className={styles.button} type="submit">
					Submit
				</button>
			</form>

			<MovieGrid media={movies} />
		</div>
	);
}
