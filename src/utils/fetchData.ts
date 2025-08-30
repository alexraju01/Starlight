export default async function fetchData<T>(
  version: string,
  endpoint: string,
  page?: number,
  disablePage?: boolean,
): Promise<T> {
  try {
    const currentPage = page ?? 1;
    const pageParam =
      !disablePage && currentPage
        ? endpoint.includes('?')
          ? `&page=${currentPage}`
          : `?page=${currentPage}`
        : '';

    const url = `https://api.themoviedb.org/${version}/${endpoint}${pageParam}`;

    const res = await fetch(url, {
      next: { revalidate: 1 },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY || process.env.TMDB_API_KEY}`,
      },
    });

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
