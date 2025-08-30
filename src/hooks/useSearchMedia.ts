import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import fetchData from '@/utils/fetchData';
import { MultiMedia } from '@/types/global';

interface APIResponse {
  page: number;
  results: MultiMedia[];
  total_pages: number;
  total_results: number;
}

export const useSearchMedia = (query: string) => {
  const [results, setResults] = useState<MultiMedia[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Debounce the query input (300ms delay)
  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    // Skip empty or whitespace-only queries
    if (!debouncedQuery.trim()) {
      setResults([]);
      setError(null);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null); // reset previous errors
      try {
        const data = await fetchData<APIResponse>('3', `search/multi?query=${debouncedQuery}`);
        const filtered = data.results.filter((media) => media.media_type !== 'person');
        setResults(filtered);
      } catch (err) {
        setError(err as Error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    console.log(query);
    fetchResults();
  }, [debouncedQuery]);

  return { results, loading, error };
};
