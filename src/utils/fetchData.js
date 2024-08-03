export default async function fetchData(version, endpoint) {
	try {
		// await new Promise((resolve) => setTimeout(resolve, 3000));

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
		const data = await res.json();

		if (endpoint.includes("trending/movie/day")) {
			const moviesWithLogos = await Promise.all(
				data.results.map(async (movie) => {
					const movieDetails = await fetch(
						`https://api.themoviedb.org/${version}/movie/${movie.id}/images`,
						{
							headers: {
								accept: "application/json",
								Authorization:
									"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTA4Y2ZlYjY1ZWExMWEwMGZkMWE1MmZmMmFlMTI0ZCIsInN1YiI6IjY0OWVmZmQ5MDkxZTYyMDBlYjdiZGY0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mbunsoSvSxZCheT49skOZk2hX1TCwxpjAvw0ntVBLhs",
							},
						}
					);
					const movieDetailsData = await movieDetails.json();
					const logoImage = movieDetailsData.logos.find((logo) => logo.iso_639_1 === "en");
					return {
						...movie,
						logoImage: logoImage
							? `https://image.tmdb.org/t/p/original${logoImage.file_path}`
							: null,
					};
				})
			);
			return { ...data, results: moviesWithLogos };
		}
		return data;
	} catch (err) {
		throw err; // Re-throw the error after logging it
	}
}
