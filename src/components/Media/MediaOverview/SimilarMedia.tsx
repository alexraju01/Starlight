// import { Slider } from "@/components/Media/Slider";
import SectionHeading from '@/components/Navigation/SectionHeading';
import { APIResponse } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import fetchData from '@/utils/fetchData';
import Icons from '@/utils/icons';

import Slider from '../Slider/Slider';

interface Props {
  mediaMode: MediaMode;
  params: string;
}

export default async function SimilarMedia({ mediaMode, params }: Props) {
  const similarMedia = await fetchData<APIResponse>('3', `${mediaMode}/${params}/similar`);
  const textChanger = mediaMode === 'tv' ? 'TV Shows' : 'Movies';

  return (
    <>
      {similarMedia.results && similarMedia.results.length > 0 && (
        <section className="text-[1.8rem] w-full px-12 mb-40">
          <SectionHeading icon={Icons.play}>{`Similar ${textChanger}`}</SectionHeading>
          <Slider mediaMode={mediaMode} endpoint={`${mediaMode}/${params}/similar`} />
        </section>
      )}
    </>
  );
}
