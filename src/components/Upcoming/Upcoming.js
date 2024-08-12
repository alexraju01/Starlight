// import fetchData from "@/utils/fetchData";
// import MediaCard from "../MediaCard/MediaCard";
// import Image from "next/image";

import fetchData from "@/utils/fetchData";

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

async function fetchAllPages(page = 1, allResults = []) {
	// Fetch data for the current page
	const response = await fetchData(3, `tv/airing_today?page=${page}`);
	const results = response.results;

	// Combine current page results with accumulated results
	allResults = allResults.concat(results);

	// Check if there are more pages
	if (page < response.total_pages) {
		// Fetch next page recursively
		return fetchAllPages(page + 1, allResults);
	} else {
		// No more pages to fetch, return all results
		return allResults;
	}
}

export default async function Upcoming() {
	// Fetch all pages of data
	const allTvs = await fetchAllPages();

	const today = new Date().toISOString().split("T")[0];
	const filteredTvs = allTvs.filter((tv) => tv.first_air_date >= today);

	return (
		<div>
			{filteredTvs.length > 0 ? (
				filteredTvs.map((tv) => (
					<p key={tv.id}>
						{tv.name} - {tv.first_air_date}
					</p>
				))
			) : (
				<p>No upcoming TV shows found.</p>
			)}
		</div>
	);
}
