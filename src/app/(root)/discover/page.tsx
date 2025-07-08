"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { MovieGrid } from "@/components";
import { useSearchMedia } from "@/hooks/useSearchMedia";
import { useAllGenres } from "@/hooks/useAllGenres";
import { SearchForm } from "@/components/Forms/SearchForm";
// import { SearchForm } from "@/components/SearchForm";

export default function DiscoverPage(): JSX.Element {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const initialQuery = searchParams.get("search") ?? "";
	const [query, setQuery] = useState(initialQuery);

	const { results: movies } = useSearchMedia(query);
	const genreMap = useAllGenres();

	const genresLoaded =
		Object.keys(genreMap.movie).length > 0 && Object.keys(genreMap.tv).length > 0;

	const handleInputChange = (value: string) => {
		const params = new URLSearchParams();
		params.set("search", value);
		setQuery(value);
		replace(`${pathname}/?${params.toString()}`);
	};

	return (
		<div className='flex min-h-screen w-full flex-col items-center mt-50 md:mt-40 justify-center gap-16 px-4 py-6'>
			<h2 className='text-center text-4xl font-bold text-white animate-fadeIn drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'>
				Discover More Movies...
			</h2>

			<SearchForm query={query} onChangeAction={handleInputChange} onSubmitAction={() => {}} />

			{genresLoaded ? (
				<MovieGrid media={movies} genreMap={genreMap} />
			) : (
				<p className='text-white text-2xl'>Loading genres...</p>
			)}
		</div>
	);
}
