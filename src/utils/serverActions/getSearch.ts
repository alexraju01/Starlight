'use server';

import { api } from '@/utils/api';

import { MAX_QUERY_LENGTH } from './validate';

export default async function getSearch(query: string) {
  if (typeof query !== 'string') return [];
  const trimmed = query.trim().slice(0, MAX_QUERY_LENGTH);
  if (!trimmed) return [];

  try {
    const results = await api.media.search(trimmed);
    return results;
  } catch (error) {
    console.error('Search Action Error:', error);
    return [];
  }
}
