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
  const [media, { genres }] = await Promise.all([
    api.media.getSliderData(mediaMode, endpoint),
    api.genre.getGenres(mediaMode),
  ]);

  // e.g. a title with no recommendations – don't render an empty section.
  if (media.length === 0) return null;

  const genreMap = Object.fromEntries(genres.map(({ id, name }) => [id, name]));

  return (
    <CustomSliderClient
      media={media}
      title={title}
      mediaMode={mediaMode}
      genres={genreMap}
      breakpoints={breakpoints}
    />
  );
};

export default CustomSlider;
