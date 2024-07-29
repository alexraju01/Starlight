export async function fetchData(version, endpoint) {
	try {
		await new Promise((resolve) => setTimeout(resolve, 10000));
		const res = await fetch(`https://api.themoviedb.org/${version}/${endpoint}`, {
			cache: "no-store",
			headers: {
				accept: "application/json",
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTA4Y2ZlYjY1ZWExMWEwMGZkMWE1MmZmMmFlMTI0ZCIsInN1YiI6IjY0OWVmZmQ5MDkxZTYyMDBlYjdiZGY0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mbunsoSvSxZCheT49skOZk2hX1TCwxpjAvw0ntVBLhs",
			},
		});
		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}
		return await res.json();
	} catch (err) {
		throw err; // Re-throw the error after logging it
	}
}

export async function fetchMovieImages(movieId) {
	const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/images`, {
		headers: {
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
		},
	});
	if (!response.ok) {
		throw new Error(`An error has occurred: ${response.status}`);
	}
	return response.json();
}
