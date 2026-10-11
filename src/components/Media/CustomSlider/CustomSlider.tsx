import { ReactNode } from 'react';

import { MediaMode } from '@/types/mediaMode';
import { api } from '@/utils/api';

import CustomSliderClient from './CustomSliderClient';

interface Props {
  endpoint: string;
  title: ReactNode;
  mediaMode: MediaMode;
  breakpoints?: { max: number; value: number }[];
}

const CustomSlider = async ({ endpoint, title, mediaMode, breakpoints }: Props) => {
  const [media, { genresMap }] = await Promise.all([
    api.media.getSliderData(mediaMode, endpoint),
    api.genre.getGenres(mediaMode),
  ]);

  // e.g. a title with no recommendations – don't render an empty section.
  if (media.length === 0) return null;

  return (
    <CustomSliderClient
      media={media}
      title={title}
      mediaMode={mediaMode}
      genres={genresMap}
      breakpoints={breakpoints}
    />
  );
};

export default CustomSlider;
