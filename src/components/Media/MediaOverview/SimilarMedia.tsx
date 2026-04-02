// import { Slider } from "@/components/Media/Slider";
import SectionHeading from '@/components/Navigation/SectionHeading';
import { DISCOVER_BREAKPOINTS } from '@/constants/breakpoints';
import { APIResponse } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import fetchData from '@/utils/fetchData';
import Icons from '@/utils/icons';

import CustomSlider from '../CustomSlider/CustomSlider';

interface Props {
  mediaMode: MediaMode;
  params: string;
}
const SimilarMedia = async ({ mediaMode, params }: Props) => {
  const similarMedia = await fetchData<APIResponse>('3', `${mediaMode}/${params}/similar`);
  const textChanger = mediaMode === 'tv' ? 'TV Shows' : 'Movies';
  return (
    <>
      {similarMedia.results && similarMedia.results.length > 0 && (
        <section className="text-[1.8rem] w-full px-10  mb-20">
          <CustomSlider
            endpoint={`${mediaMode}/${params}/similar`}
            title={<SectionHeading icon={Icons.play}>{`Similar ${textChanger}`}</SectionHeading>}
            mediaMode={mediaMode}
            breakpoints={DISCOVER_BREAKPOINTS}
          />
        </section>
      )}
    </>
  );
};

export default SimilarMedia;
