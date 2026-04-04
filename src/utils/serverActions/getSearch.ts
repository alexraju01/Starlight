'use server';

import { api } from '@/utils/api';

export default async function getSearch(query: string) {
  if (!query) return [];

  try {
    // This calls the server-side api.media.search we created earlier
    const results = await api.media.search(query);
    return results;
  } catch (error) {
    console.error('Search Action Error:', error);
    return [];
  }
}
