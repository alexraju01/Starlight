"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import fetchData from "@/utils/fetchData";
import MovieGrid from "@/components/MovieGrid/MovieGrid";

export default function DisoverPage() {
	const [query, setQuery] = useState("");
	const [movies, setMovies] = useState([]);

	async function handleSearch(e) {
		e.preventDefault();
		if (!query) return;
		const results = await fetchData(3, `search/multi?query=${query}`);
		setMovies(results.results);
	}
	// console.log(movies)

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
				/>
				<button className={styles.button} type="submit">
					Submit
				</button>
			</form>
			{/* Movie grid */}
			<MovieGrid media={movies} />
		</div>
	);
}
