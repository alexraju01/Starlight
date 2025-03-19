export default async function fetchData(version: string, endpoint: string) {
	try {
		// await new Promise((resolve) => setTimeout(resolve, 3000));

		const res = await fetch(`https://api.themoviedb.org/${version}/${endpoint}`, {
			cache: "no-store",
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${process.env.TMDB_API_KEY}`, // Change this line
			},
		});
		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}
		const data = await res.json();
		return data;
	} catch (err) {
		console.error(`fetchData Error: ${err instanceof Error ? err.message : err}`);
	}
}
