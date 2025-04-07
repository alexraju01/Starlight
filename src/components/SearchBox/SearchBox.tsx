"use client";

import { useState, useEffect } from "react";
import SearchCard from "../SearchCard/SearchCard";

export default function SearchBox() {
	const [search, setSearch] = useState<string>("");
	const [debouncedSearch, setDebouncedSearch] = useState<string>("");

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(search);
			console.log("Debounced Search Triggered:", search);
		}, 300); // 300ms debounce delay

		// Cleanup to cancel previous timeout on new keystroke
		return () => clearTimeout(handler);
	}, [search]);

	return (
		<div className='w-full relative max-w-[40rem] min-w-[25rem] md:w-1/2'>
			<input
				type='text'
				placeholder='Search...'
				value={search}
				onChange={handleSearch}
				className='w-full h-16 border-solid border-1 border-white/20 rounded-full bg-[#100f10] text-white px-4 text-[1.4rem] focus:outline-none'
			/>
			<SearchCard query={debouncedSearch} />
		</div>
	);
}
