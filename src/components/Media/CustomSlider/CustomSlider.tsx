// components/Slider/CustomSlider.tsx
import { MediaMode } from '@/types/mediaMode';
import { api } from '@/utils/api';

import CustomSliderClient from './CustomSliderClient';

interface Props {
  endpoint: string;
  title: string | React.ReactNode;
  mediaMode: MediaMode;
  breakpoints?: { max: number; value: number }[];
}

const CustomSlider = async ({ endpoint, title, mediaMode, breakpoints }: Props) => {
  const [media, { genres }] = await Promise.all([
    api.getSliderData(mediaMode, endpoint),
    api.genre.getGenres(mediaMode),
  ]);
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
