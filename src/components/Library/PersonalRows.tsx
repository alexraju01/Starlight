'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import MediaCard from '@/components/Cards/MediaCard';
import RowSlider from '@/components/Media/RowSlider/RowSlider';
import SectionHeading from '@/components/Navigation/SectionHeading';
import { buttonClass } from '@/components/ui/buttonStyles';
import { MEDIA_COLUMNS } from '@/constants/breakpoints';
import { ROUTES } from '@/constants/route';
import { MediaProvider } from '@/context/MediaContext';
import { usePreferences, useRecentlyViewed } from '@/hooks/useLibrary';
import { useRequestSeasonCounts } from '@/hooks/useSeasonCounts';
import { MediaWithDetails } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import { asMedia, recentlyViewed, sameTitle, setHistoryEnabled } from '@/utils/library';
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

/** Asks once whether to keep recently viewed titles between visits. */
function RememberPrompt() {
  return (
    <div
      role="region"
      aria-label="Remember recently viewed"
      className="border-card-stroke bg-panel flex flex-col gap-[12px] rounded-[16px] border border-solid p-[16px] sm:flex-row sm:items-center sm:justify-between lg:px-[24px] lg:py-[20px]"
    >
      <p className="max-w-[72ch] text-[14px] leading-[1.6] text-white/70">
        Titles you look at are forgotten when you leave. Remember them on this device, so your
        recently viewed and picks are here next time?{' '}
        <Link
          href={ROUTES.PRIVACY}
          className="text-white/90 underline underline-offset-4 hover:text-white"
        >
          How this works
        </Link>
      </p>
      <div className="flex shrink-0 gap-[8px]">
        <button
          type="button"
          onClick={() => setHistoryEnabled(true)}
          className={buttonClass('primary', 'sm')}
        >
          Remember
        </button>
        <button
          type="button"
          onClick={() => setHistoryEnabled(false)}
          className={buttonClass('ghost', 'sm')}
        >
          No thanks
        </button>
      </div>
    </div>
  );
}

/**
 * Home page rows for returning visitors, from this browser's history: what they looked at
 * recently, and recommendations based on the latest one. Nothing renders for a first visit.
 */
export default function PersonalRows({ genreMap }: { genreMap: Record<number, string> }) {
  const recent = useRecentlyViewed();
  const askToRemember = usePreferences()?.history === undefined;
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
      {askToRemember && <RememberPrompt />}
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
