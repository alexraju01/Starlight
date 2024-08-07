export default async function fetchData(version, endpoint, page = 1) {
	try {
		const separator = endpoint.includes("?") ? "&" : "?";
		// await new Promise((resolve) => setTimeout(resolve, 3000));

		const res = await fetch(
			`https://api.themoviedb.org/${version}/${endpoint}${separator}page=${page}`,
			{
				cache: "no-store",
				headers: {
					accept: "application/json",
					Authorization:
						"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTA4Y2ZlYjY1ZWExMWEwMGZkMWE1MmZmMmFlMTI0ZCIsInN1YiI6IjY0OWVmZmQ5MDkxZTYyMDBlYjdiZGY0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mbunsoSvSxZCheT49skOZk2hX1TCwxpjAvw0ntVBLhs",
				},
			}
		);
		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}
		const data = await res.json();
		return data;
	} catch (err) {
		throw err; // Re-throw the error after logging it
	}
}
