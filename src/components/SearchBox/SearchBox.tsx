"use client";
import { useState } from "react";
import SearchCard from "../SearchCard/SearchCard";
import styles from "./SearchBox.module.css";

export default function SearchBox() {
	const [search, setSearch] = useState<string>("");

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};
	return (
		<div className={styles.container}>
			<input
				className={styles.searchBox}
				onChange={handleSearch}
				type='text'
				placeholder='Search...'
				value={search}
			/>
			<SearchCard query={search} />
		</div>
	);
}
