'use client';

import { useEffect } from 'react';

import { MediaWithDetails } from '@/types/global';
import { recentlyViewed, toSavedTitle } from '@/utils/library';
import { preferences } from '@/utils/preferences';

/**
 * Adds the title being viewed to "Recently viewed" – in memory until the visitor chooses
 * to have it remembered, and not at all if they said no. Renders nothing.
 */
export default function RecordView({ media }: { media: MediaWithDetails }) {
  useEffect(() => {
    if (preferences.getSnapshot().history !== false) recentlyViewed.add(toSavedTitle(media));
  }, [media]);

  return null;
}
