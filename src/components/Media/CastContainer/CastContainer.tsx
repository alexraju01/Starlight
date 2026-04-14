import { CastMember } from '@/types/cast';

import Icons from '../../../utils/icons';
import SectionHeading from '../../Navigation/SectionHeading';
import ImageWithFallback from '../../Skeletons/BrokenImage/ImageWithFallback';

interface Props {
  castList: CastMember[];
}

export default async function CastContainer({ castList }: Props) {
  if (!castList) return null;

  return (
    <div className="w-full text-[1.8rem]">
      <SectionHeading icon={Icons.play}>Cast</SectionHeading>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] items-start justify-center text-[1.3rem] xl:grid-cols-[repeat(auto-fill,minmax(17rem,1fr))]">
        {castList.map((cast, index) => (
          <div
            key={index}
            className="flex w-[13rem] flex-col items-center justify-center rounded-lg p-3 text-center transition-all duration-300 ease-in-out hover:bg-white/10 xl:w-[17rem]"
          >
            <div className="relative mb-4 h-[clamp(7rem,8vw,10rem)] w-[clamp(7rem,8vw,10rem)]">
              <ImageWithFallback
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
                    : `https://image.tmdb.org/t/p/w185/${cast.profile_path}`
                }
                alt={cast.name}
                className="rounded-full transition-transform duration-300 ease-in-out hover:scale-110"
              />
            </div>
            <div className="text-white transition-all duration-300 ease-in-out">
              <p className="font-medium">{cast.name}</p>
              <p className="text-white/50">{cast.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
