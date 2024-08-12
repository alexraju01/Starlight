"use client";
// import fetchData from "@/utils/fetchData";
// import MediaCard from "../MediaCard/MediaCard";
// import Image from "next/image";

import fetchData from "@/utils/fetchData";
import getUpcoming from "@/utils/serverActions/getUpcoming";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import MediaCard from "../MediaCard/MediaCard";
import { useInView } from "react-intersection-observer";
import LoadingSkeletons from "../LoadingSkeletons/LoadingSkeletons";

// export default async function Upcoming() {
// 	try {
// 		const [tvShows, movies] = await Promise.all([
// 			fetchData("3", "tv/airing_today"),
// 			fetchData("3", "movie/upcoming"),
// 		]);

// 		const today = new Date().toISOString().split("T")[0];

// 		const tvShowsUpcoming =
// 			tvShows?.results
// 				?.filter((show) => show.first_air_date >= today)
// 				.map((show) => ({
// 					id: show.id,
// 					title: show.name,
// 					poster_path: show.poster_path,
// 					release_date: show.first_air_date,
// 					type: "TV Show",
// 				})) || [];

// 		const moviesUpcoming =
// 			movies?.results
// 				?.filter((movie) => movie.release_date >= today)
// 				.map((movie) => ({
// 					id: movie.id,
// 					title: movie.title,
// 					poster_path: movie.poster_path,
// 					release_date: movie.release_date,
// 					type: "Movie",
// 				})) || [];

// 		const combinedResults = [...tvShowsUpcoming, ...moviesUpcoming].sort(
// 			(a, b) => new Date(a.release_date) - new Date(b.release_date)
// 		);
// 		console.log(combinedResults);
// 		return (
// 			<div>
// 				<h2>Upcoming Releases from Today Onwards</h2>
// 				{combinedResults.length > 0 ? (
// 					<ul>
// 						{combinedResults.map((item) => (
// 							<li key={item.id}>
// 								<Image
// 									src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
// 									alt={item.title}
// 									width={90}
// 									height={100}
// 								/>
// 								<strong>{item.title}</strong> ({item.type}) - {item.release_date}
// 							</li>
// 						))}
// 					</ul>
// 				) : (
// 					<p>No upcoming releases available from today onwards.</p>
// 				)}
// 			</div>
// 		);
// 	} catch (error) {
// 		console.error("Error fetching data:", error);
// 		return <p>Error fetching upcoming releases. Please try again later.</p>;
// 	}
// }

// async function fetchAllPages(page = 1, allResults = []) {
// 	// Fetch data for the current page
// 	const response = await fetchData(
// 		3,
// 		`discover/tv?page=${page}&first_air_date.gte=2024-08-12&include_null_first_air_dates=false`
// 	);
// 	const results = response.results;

// 	// Combine current page results with accumulated results
// 	allResults = allResults.concat(results);

// 	// Check if there are more pages
// 	if (page < 2) {
// 		// Fetch next page recursively
// 		return fetchAllPages(page + 1, allResults);
// 	} else {
// 		// No more pages to fetch, return all results
// 		return allResults;
// 	}
// }

export default function Upcoming() {
	const [tvs, setTvs] = useState([]);
	const [page, setPage] = useState(1);
	// Fetch all pages of data
	// const allTvs = await fetchAllPages();
	const [ref, inView] = useInView();

	// Load the first page of movies when the component mounts

	useEffect(() => {
		if (inView) {
			loadMoreMovies();
		}
	}, [inView]);

	const loadMoreMovies = async () => {
		const tvList = await getUpcoming(page + 1);
		setTvs([...tvs, ...tvList]);
		console.log(tvs);
		setPage(page + 1);
	};

	console.log(tvs);
	return (
		<div>
			<Suspense fallback={<div>Loading. . .</div>}>
				<div>
					{tvs.map((tv) => (
						<p key={tv.id}>{tv.name}</p>
					))}
				</div>
			</Suspense>
			<div ref={ref}>loading . .</div>
		</div>
	);
}
