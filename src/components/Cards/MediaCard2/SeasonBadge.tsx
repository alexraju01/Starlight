'use client';

import { HiRectangleStack } from 'react-icons/hi2';

import { useMediaContext } from '@/context/MediaContext';
import { MediaWithDetails } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';

interface Props {
  item: MediaWithDetails;
}

const SeasonBadge = ({ item }: Props) => {
  const { mediaMode } = useMediaContext();

  const seasons = item.number_of_seasons;
  if (mediaMode !== MediaMode.TV || !seasons) return null;

  return (
    <div className="flex truncate md:text-lg">
      <div className="flex-center border-card-stroke bg-panel gap-[4px] rounded-[51px] border py-[6px] pr-[10px] pl-[6px] text-xl text-gray-400">
        <i>
          <HiRectangleStack size={18} />
        </i>
        <p className="font-md">
          {seasons} Season{seasons > 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
};

export default SeasonBadge;
