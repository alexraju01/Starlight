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
  try {
    const media = await api.getSliderData(mediaMode, endpoint);
    const { genres } = await api.genre.getGenres(mediaMode);
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
  } catch (err) {
    console.error(`CustomSlider failed for endpoint "${endpoint}":`, err);
    return (
      <div className="text-red-400 text-center py-6">
        Failed to load <strong>{title}</strong>.
      </div>
    );
  }
};

export default CustomSlider;
