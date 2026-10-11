'use client';

import { MediaCard2 } from '@/components/Cards';
import CustomSliderSkeleton from '@/components/Skeletons/LoadingSkeletons/CustomSliderLoading';
import { CAROUSEL_BREAKPOINTS } from '@/constants/breakpoints';
import { MediaProvider } from '@/context/MediaContext';
import { useResponsiveItems } from '@/hooks/useResponsiveItems';
import { useSliderPaging } from '@/hooks/useSliderPaging';
import { MediaListItem } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';

import CustomSliderButtons from './CustomSliderButtons';

interface Props {
  media: MediaListItem[];
  title: React.ReactNode;
  mediaMode: MediaMode;
  genres: Record<number, string>;
  breakpoints?: { max: number; value: number }[];
}

const ITEM_GAP = 16;

export default function CustomSliderClient({
  media,
  title,
  mediaMode,
  genres,
  breakpoints = CAROUSEL_BREAKPOINTS,
}: Props) {
  const itemsPerScreen = useResponsiveItems(breakpoints);
  const slider = useSliderPaging(media.length, itemsPerScreen);

  if (!itemsPerScreen) {
    return <CustomSliderSkeleton />;
  }

  const cardWidth = `calc(${100 / itemsPerScreen}% - ${ITEM_GAP}px)`;

  return (
    <MediaProvider mediaMode={mediaMode} genres={genres}>
      <section className="mb-10 flex w-full flex-col gap-4 text-white">
        <header className="flex-between px-2">
          <h2 className="slider-title">{title}</h2>
          <div className="z-10 flex gap-2 px-1 py-2">
            <CustomSliderButtons
              direction="left"
              onClick={slider.prev}
              disabled={!slider.canGoPrev}
            />
            <CustomSliderButtons
              direction="right"
              onClick={slider.next}
              disabled={!slider.canGoNext}
            />
          </div>
        </header>

        <div className="relative -ml-4 w-full overflow-hidden">
          <div
            className="ml-6 flex w-full transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${(slider.index * 100) / itemsPerScreen}%)` }}
          >
            {media.map((item, i) => (
              <MediaCard2
                key={item.id}
                item={item}
                isFirst={i === slider.index}
                isLast={i === slider.index + itemsPerScreen - 1}
                style={{
                  width: cardWidth,
                  marginRight: i === media.length - 1 ? '0px' : `${ITEM_GAP}px`,
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </MediaProvider>
  );
}
