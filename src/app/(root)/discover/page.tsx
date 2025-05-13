"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { MovieGrid } from "@/components";
import { MultiMedia } from "@/types/global";
import fetchData from "@/utils/fetchData";

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
		if (inputRef.current) inputRef.current.focus();
	}, []);

	useEffect(() => {
		const loadMovies = async () => {
			if (!query) return;
			console.log("query", query);
			try {
				const results = await fetchData<APIResponse>("3", `search/multi?query=${query}`);
				setMovies(results.results.filter((media) => media.media_type !== "person"));
				console.log("===========", results);
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
		<div className='flex min-h-screen w-full flex-col items-center justify-center gap-16 px-4 py-6'>
			<h2 className='text-center text-4xl font-bold text-white animate-fadeIn drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'>
				Discover More Movies...
			</h2>

			<form className='relative w-[clamp(20rem,50vw,60rem)] animate-fadeIn' onSubmit={handleSearch}>
				<input
					type='text'
					value={query}
					onChange={handleInputChange}
					ref={inputRef}
					placeholder='Search...'
					className='w-full h-24 rounded-full bg-[#100f10] px-8 text-white text-2xl border border-white/20 transition-all duration-300 focus:outline-none focus:shadow-[0_0_12px_rgba(255,255,255,0.8)] hover:shadow-[0_0_12px_rgba(255,255,255,0.8)]'
				/>
				<button
					type='submit'
					className='absolute right-0 top-1/2 -translate-y-1/2 h-full px-8 text-2xl text-[#878d98] border-l border-white/20 rounded-r-full transition-all duration-300 hover:shadow-[inset_0_0_12px_rgba(255,255,255,0.8)]'>
					Submit
				</button>
			</form>

			<MovieGrid media={movies} />
		</div>
	);
}
