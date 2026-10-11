import { MediaMode } from '@/types/mediaMode';
import { buildMediaJsonLd, getMediaOrNotFound, jsonLdString } from '@/utils/mediaPage';

import MediaOverview from './MediaOverview';

interface Props {
  mediaMode: MediaMode.MOVIE | MediaMode.TV;
  slug: string;
}

/** Shared body of the /movie/[slug] and /tv/[slug] routes. */
export default async function MediaDetailsPage({ mediaMode, slug }: Props) {
  const media = await getMediaOrNotFound(mediaMode, slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(buildMediaJsonLd(media, mediaMode)) }}
      />
      <MediaOverview media={media} mediaMode={mediaMode} />
    </>
  );
}
