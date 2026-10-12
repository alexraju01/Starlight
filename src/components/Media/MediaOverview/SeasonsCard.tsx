import ImageWithFallback from '@/components/Skeletons/BrokenImage/ImageWithFallback';
import { Season } from '@/types/seasons';
import { getImageUrl } from '@/utils/image/getImageUrl';
import { formatYear, pluralize } from '@/utils/mediaFormat';

interface Props {
  season: Season;
}

const SeasonsCard = ({ season }: Props) => {
  const meta = [
    season.episode_count ? pluralize(season.episode_count, 'Episode') : null,
    formatYear(season.air_date),
  ].filter(Boolean);

  return (
    <li className="w-[132px] shrink-0 snap-start sm:w-[148px] lg:w-[160px]">
      <div className="bg-card-bg relative aspect-[2/3] overflow-hidden rounded-[12px] ring-1 ring-white/[0.06]">
        <ImageWithFallback
          src={getImageUrl(season.poster_path, 'poster', 'w342')}
          alt={season.name}
        />
      </div>
      <p className="mt-[10px] line-clamp-1 text-[14px] leading-[1.4] font-semibold text-white">
        {season.name}
      </p>
      {meta.length > 0 && (
        <p className="mt-[2px] text-[13px] leading-[1.4] text-white/55">{meta.join(' · ')}</p>
      )}
    </li>
  );
};

export default SeasonsCard;
