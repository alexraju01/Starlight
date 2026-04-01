'use client';
import { useEffect, useState } from 'react';
import { HiRectangleStack } from 'react-icons/hi2';

import { useMediaContext } from '@/context/MediaContext';
import { MediaWithDetails } from '@/types/global';
import { fetchData } from '@/utils';

interface Props {
  item: MediaWithDetails;
}

const SeasonBadge = ({ item }: Props) => {
  const { mediaMode } = useMediaContext();
  const [seasons, setSeasons] = useState<number | null>(item.number_of_seasons ?? null);

  useEffect(() => {
    // Only fetch if TV and not already available
    if (mediaMode !== 'tv' || seasons !== null) return;

    const fetchSeasons = async () => {
      try {
        const data = await fetchData<{ number_of_seasons: number }>('3', `tv/${item.id}`);
        setSeasons(data.number_of_seasons);
      } catch (err) {
        console.error('Failed to fetch seasons:', err);
      }
    };

    fetchSeasons();
  }, [item.id, mediaMode, seasons]);

  if (mediaMode !== 'tv' || !seasons) return null;

  return (
    <div className="flex truncate md:text-lg ">
      <div className="flex gap-[4px] items-center text-gray-400 text-xl bg-[#141414] py-[6px] pl-[6px] pr-[10px] rounded-[51px] border border-[#262626]">
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
