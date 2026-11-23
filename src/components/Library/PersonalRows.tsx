'use client';

import { useEffect, useState } from 'react';

import MediaCard from '@/components/Cards/MediaCard';
import RowSlider from '@/components/Media/RowSlider/RowSlider';
import SectionHeading from '@/components/Navigation/SectionHeading';
import { MEDIA_COLUMNS } from '@/constants/breakpoints';
import { MediaProvider } from '@/context/MediaContext';
import { useRecentlyViewed } from '@/hooks/useLibrary';
import { useRequestSeasonCounts } from '@/hooks/useSeasonCounts';
import { MediaWithDetails } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import { asMedia, recentlyViewed, sameTitle } from '@/utils/library';
import { displayName } from '@/utils/media';
import { getRecommendationsAction } from '@/utils/serverActions/media';

/** A row of mixed movies and shows: each card gets its own type (hover trailer, link). */
function MixedRow({
  title,
  media,
  genreMap,
}: {
  title: React.ReactNode;
  media: MediaWithDetails[];
  genreMap: Record<number, string>;
}) {
  useRequestSeasonCounts(media);
  return (
    <RowSlider
      title={title}
      breakpoints={MEDIA_COLUMNS}
      count={media.length}
      renderItem={(i, { isLast }) => (
        <MediaProvider mediaMode={media[i].media_type} genres={genreMap}>
          <MediaCard item={media[i]} isLast={isLast} />
        </MediaProvider>
      )}
    />
  );
}

/**
 * Home page rows for returning visitors, from this browser's history: what they looked at
 * recently, and recommendations based on the latest one. Nothing renders for a first visit.
 */
export default function PersonalRows({ genreMap }: { genreMap: Record<number, string> }) {
  const recent = useRecentlyViewed();
  const latest = recent?.[0];
  const [picks, setPicks] = useState<{ forKey: string; media: MediaWithDetails[] } | null>(null);
  const latestKey = latest ? `${latest.media_type}-${latest.id}` : '';

  // Re-fetches only when the most recent title changes (the key encodes type and id).
  useEffect(() => {
    if (!latestKey) return;
    const [mediaType, id] = latestKey.split('-');
    let cancelled = false;
    getRecommendationsAction(mediaType as MediaMode, Number(id))
      .then((media) => !cancelled && setPicks({ forKey: latestKey, media }))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [latestKey]);

  if (!recent || recent.length === 0) return null;

  // Recommendations they haven't already looked at.
  const fresh =
    picks?.forKey === latestKey
      ? picks.media.filter((m) => !recent.some((r) => sameTitle(r, m)))
      : [];

  return (
    <>
      <MixedRow
        title={
          <div className="flex items-baseline gap-[16px]">
            <SectionHeading>Recently viewed</SectionHeading>
            <button
              type="button"
              onClick={() => recentlyViewed.clear()}
              className="text-[13px] font-medium text-white/50 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Clear
            </button>
          </div>
        }
        media={recent.map(asMedia)}
        genreMap={genreMap}
      />
      {latest && fresh.length >= 4 && (
        <MixedRow
          title={
            <SectionHeading>Because you looked at {displayName(asMedia(latest))}</SectionHeading>
          }
          media={fresh}
          genreMap={genreMap}
        />
      )}
    </>
  );
}
