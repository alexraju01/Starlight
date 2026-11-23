'use client';

import { useEffect } from 'react';

import { MediaWithDetails } from '@/types/global';
import { recentlyViewed, toSavedTitle } from '@/utils/library';

/** Adds the title being viewed to "Recently viewed" (this browser only). Renders nothing. */
export default function RecordView({ media }: { media: MediaWithDetails }) {
  useEffect(() => {
    recentlyViewed.add(toSavedTitle(media));
  }, [media]);

  return null;
}
