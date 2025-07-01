"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import SearchCard from "@/components/Cards/SearchCard/SearchCard";

export default function SearchBox() {
	const [search, setSearch] = useState<string>("");
	const [debouncedSearch, setDebouncedSearch] = useState<string>("");

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(search);
		}, 300);
		return () => clearTimeout(handler);
	}, [search]);

	return (
		<div className='relative  md:block md:max-w-[346px] w-full h-[50px] rounded-[13px] border border-[#1D1D1D] border-solid'>
			{/* Search icon */}
			<Search className='absolute left-4 top-1/2 -translate-y-1/2 text-[#BFBFBF] size-[20px] pointer-events-none' />

			{/* Input with padding to avoid overlapping the icon */}
			<input
				type='text'
				placeholder='Search for movies, shows etc'
				value={search}
				onChange={handleSearch}
				className='w-full h-full truncate overflow-hidden whitespace-nowrap
 text-xl pl-14 bg-transparent text-[#BFBFBF] rounded-[13px] focus:outline-none'
			/>

			<SearchCard query={debouncedSearch} />
		</div>
	);
}
