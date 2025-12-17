import { Media } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import getMedia from '@/utils/serverActions/getMedia';
import getUpcoming from '@/utils/serverActions/getUpcoming';

import MediaList from './MediaList';

interface Props {
  mediaMode: MediaMode;
}

export default async function MediaWrapper({ mediaMode }: Props) {
  const rawMedia =
    mediaMode === MediaMode.UPCOMING ? await getUpcoming(MediaMode.TV) : await getMedia(mediaMode);
  const mediaType = mediaMode === MediaMode.TV ? MediaMode.TV : MediaMode.MOVIE;

  // Add `media_type` and cast only after shaping
  const mediaWithType = rawMedia.map((item) => ({
    ...item,
    media_type: mediaType,
  })) as Media[];

  return <MediaList initialMedia={mediaWithType} mediaMode={mediaMode} />;
}
