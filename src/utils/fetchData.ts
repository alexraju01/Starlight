type FetchDataOptions = {
  page?: number;
  disablePage?: boolean;
  signal?: AbortSignal;
  cache?: CachePolicy;
};
type CachePolicy = { type: 'no-store' } | { type: 'revalidate'; seconds: number };
const DEFAULT_CACHE: CachePolicy = { type: 'no-store' };

const resolveCacheOptions = (cache?: CachePolicy): RequestInit => {
  if (!cache || cache.type === 'no-store') {
    return { cache: 'no-store' };
  }
  return {
    next: { revalidate: cache.seconds },
  };
};

const TMDB_BASE_URL = 'https://api.themoviedb.org';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

if (!TMDB_API_KEY) {
  throw new Error('TMDB_API_KEY is not defined in environment variables');
}

export default async function fetchData<T>(
  version: string,
  endpoint: string,
  options: FetchDataOptions = {},
): Promise<T> {
  const { page = 1, disablePage = false, signal, cache = DEFAULT_CACHE } = options;

  const url = new URL(`/${version}/${endpoint}`, TMDB_BASE_URL);

  if (!disablePage) {
    url.searchParams.set('page', String(page));
  }

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
    signal,
    ...resolveCacheOptions(cache),
  });

  if (!res.ok) {
    const errorBody = await safeParseJson(res);
    throw new FetchError(res.status, res.statusText, errorBody);
  }

  return res.json() as Promise<T>;
}

async function safeParseJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

class FetchError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public body: unknown,
  ) {
    super(`Request failed: ${status} ${statusText}`);
  }
}
