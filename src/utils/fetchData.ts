export default async function fetchData<T>(
	version: string,
	endpoint: string,
	page?: number
): Promise<T> {
	try {
		const currentPage = page ?? 1;
		const res = await fetch(
			`https://api.themoviedb.org/${version}/${endpoint}?page=${currentPage}`,
			{
				next: { revalidate: 1 },
				headers: {
					accept: "application/json",
					Authorization: `Bearer ${
						process.env.NEXT_PUBLIC_TMDB_API_KEY || process.env.TMDB_API_KEY
					}`,
				},
			}
		);

		if (!res.ok) {
			throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
		}

		const data: T = await res.json();
		return data;
	} catch (err) {
		console.error(`fetchData Error: ${err instanceof Error ? err.message : err}`);
		throw err;
	}
}
