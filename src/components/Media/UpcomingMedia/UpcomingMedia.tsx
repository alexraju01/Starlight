import Link from 'next/link';
import React from 'react';

import MediaCard from '@/components/Cards/MediaCard';
import { ROUTES } from '@/constants/route';
import { Media, TVShow } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import Icons from '@/utils/icons';

interface Props {
  media: Media;
  mediaMode: MediaMode;
}

function isTVShow(media: Media): media is TVShow {
  return (media as TVShow).first_air_date !== undefined;
}

export default function UpcomingMedia({ media, mediaMode }: Props) {
  return (
    <div className=" flex gap-4 w-full h-full rounded-[0.8rem] bg-[rgba(255,255,255,0.08)]">
      <div className="relative h-full w-[14rem] sm:w-[18rem]">
        <Link href={ROUTES.MEDIA(mediaMode, media.id, media.title || media.name)}>
          <MediaCard
            className="!h-[17rem] !rounded-l-[0.8rem] !scale-100 hover:!scale-100 transition-none"
            media={media}
            mediaMode={mediaMode}
          />
        </Link>
      </div>

      <div className="flex  flex-col justify-between h-full w-full">
        <div className="flex items-center justify-between relative">
          <h2 className="w-[calc(100%-4rem)] font-semibold">
            {mediaMode === 'movie' ? media.title : media.name}
          </h2>
          <span className="absolute top-0 right-0 flex justify-center items-center bg-primary w-[4rem] text-[1.6rem] rounded-bl-[0.8rem]  rounded-tr-[0.8rem] leading-8">
            {mediaMode.toUpperCase()}
          </span>
        </div>

        <p className="mt-4 pr-4 mb-8 text-[1.2rem] overflow-hidden text-ellipsis line-clamp-2">
          {media.overview}
        </p>

        <p className="flex gap-2 text-[1.2rem] mb-2">
          <i />
          {Icons.calendar}
          Release Date: {isTVShow(media) ? media.first_air_date : media.release_date}
        </p>
      </div>
    </div>
  );
}
