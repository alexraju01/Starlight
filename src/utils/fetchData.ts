export default async function fetchData<T>(version: string, endpoint: string): Promise<T> {
	try {
		const res = await fetch(`https://api.themoviedb.org/${version}/${endpoint}`, {
			next: { revalidate: 100 },
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
			},
		});

		if (!res.ok) {
			throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
		}

		// Ensure TypeScript knows the return type
		const data: T = await res.json();
		return data;
	} catch (err) {
		console.error(`fetchData Error: ${err instanceof Error ? err.message : err}`);
		throw err; // Ensure the error propagates for proper handling
	}
}
