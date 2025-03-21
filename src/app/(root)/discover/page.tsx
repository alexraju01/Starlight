"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { MovieGrid } from "@/components";
import { MultiMedia } from "@/types/global";
import fetchData from "@/utils/fetchData";

import styles from "./page.module.css";

// Define media type
// interface Media {
// 	id: number;
// 	title?: string;
// 	name?: string;
// 	media_type: string;
// 	poster_path?: string;
// }

interface APIResponse {
	page: number;
	results: MultiMedia[];
	total_pages: number;
	total_results: number;
}

export default function DiscoverPage(): JSX.Element {
	const [query, setQuery] = useState<string>("");
	const [movies, setMovies] = useState<MultiMedia[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);

	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();
	const search = searchParams.get("search") ?? "";

	useEffect(() => {
		if (inputRef.current) inputRef.current.focus(); // Focus on input on mount
	}, []);

	useEffect(() => {
		const loadMovies = async () => {
			if (!query) return;
			try {
				const results = await fetchData<APIResponse>("3", `search/multi?query=${query}`);
				setMovies(results.results.filter((media) => media.media_type !== "person"));
			} catch (error) {
				console.error("Error fetching movies:", error);
			}
		};
		loadMovies();
	}, [query]);

	useEffect(() => {
		if (search) setQuery(search);
	}, [search]);

	const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!query) return;
		try {
			const results = await fetchData<APIResponse>("3", `search/multi?query=${query}`);
			setMovies(results.results.filter((media: MultiMedia) => media.media_type !== "person"));
		} catch (error) {
			console.error("Error fetching movies:", error);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
					type='text'
					value={query}
					onChange={handleInputChange}
					placeholder='Search...'
					ref={inputRef}
				/>
				<button className={styles.button} type='submit'>
					Submit
				</button>
			</form>

			<MovieGrid media={movies} />
		</div>
	);
}
