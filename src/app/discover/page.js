"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import fetchData from "@/utils/fetchData";
import MovieGrid from "@/components/MovieGrid/MovieGrid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function DisoverPage() {
	const [query, setQuery] = useState("");
	const [movies, setMovies] = useState([]);
	const inputRef = useRef(null);

	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();
	const search = searchParams.get("search") ?? "";

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

	useEffect(() => {
		// Set query state with the value from the search param
		if (search) setQuery(search);
	}, [search]);

	async function handleSearch(e) {
		e.preventDefault();
		if (!query) return;
		const results = await fetchData(3, `search/multi?query=${query}`);
		setMovies(results.results.filter((media) => media.media_type !== "person"));
	}

	const handleInputChange = (e) => {
		const params = new URLSearchParams();
		params.set("search", e.target.value);
		setQuery(e.target.value);
		replace(`${pathname}/?${params.toString()}`);
	};

	return (
		<div className={styles.container}>
			<h2>Discover More Movies...</h2>
			<form className={styles.form} onSubmit={handleSearch}>
				<input
					className={styles.searchBox}
					type="text"
					value={query}
					// onChange={(e) => setQuery(e.target.value)}
					onChange={handleInputChange}
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
