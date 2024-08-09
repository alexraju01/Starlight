"use client";
import { useState } from "react";
import SearchCard from "../SearchCard/SearchCard";
import styles from "./SearchBox.module.css";

export default function SearchBox() {
	const [search, setSearch] = useState("");

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};
	return (
		<div className={styles.container}>
			<input
				className={styles.searchBox}
				onChange={handleSearch}
				type="text"
				placeholder="Search..."
			/>
			<SearchCard query={search} />
		</div>
	);
}
