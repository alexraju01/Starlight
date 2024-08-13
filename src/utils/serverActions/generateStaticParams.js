"use server";

import getMedia from "@/utils/serverActions/getMedia";

export async function generateStaticParams() {
	// Number of pages to pre-render
	const numberOfPages = 3; // Adjust this based on how many pages you want to pre-render
	let allMovies = [];

	for (let i = 1; i <= numberOfPages; i++) {
		const movies = await getMedia("movie", i);
		allMovies = [...allMovies, ...movies];
	}

	// Return paths for each movie's detail page
	return allMovies.map((movie) => ({
		slug: movie.id.toString(), // Assuming you'll use `id` as the slug
	}));
}
