'use server';

import { PersonSummary } from '@/types';
import { api } from '@/utils/api';
import { logError } from '@/utils/logger';

import { MAX_QUERY_LENGTH } from './validate';

/** People search for the People page. */
export async function searchPeopleAction(query: string): Promise<PersonSummary[]> {
  if (typeof query !== 'string') return [];
  const trimmed = query.trim().slice(0, MAX_QUERY_LENGTH);
  if (trimmed.length < 2) return [];

  try {
    return await api.person.search(trimmed);
  } catch (error) {
    logError('searchPeopleAction', error);
    throw new Error('Search is unavailable right now');
  }
}
