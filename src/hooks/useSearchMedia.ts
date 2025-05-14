import { useEffect, useState } from "react";
import fetchData from "@/utils/fetchData";
import { MultiMedia } from "@/types/global";

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

	useEffect(() => {
		if (!query) return;

		const fetchResults = async () => {
			setLoading(true);
			try {
				const data = await fetchData<APIResponse>("3", `search/multi?query=${query}`);
				const filtered = data.results.filter((media) => media.media_type !== "person");
				setResults(filtered);
			} catch (err) {
				setError(err as Error);
			} finally {
				setLoading(false);
			}
		};

		fetchResults();
	}, [query]);

	return { results, loading, error };
};
