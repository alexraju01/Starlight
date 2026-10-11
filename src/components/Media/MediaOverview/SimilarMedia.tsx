import SectionHeading from '@/components/Navigation/SectionHeading';
import { DISCOVER_BREAKPOINTS } from '@/constants/breakpoints';
import { MediaMode } from '@/types/mediaMode';
import Icons from '@/utils/icons';

import CustomSlider from '../CustomSlider/CustomSlider';

interface Props {
  mediaMode: MediaMode;
  id: number;
}

const SimilarMedia = ({ mediaMode, id }: Props) => {
  const kind = mediaMode === MediaMode.TV ? 'TV Shows' : 'Movies';
  return (
    <section className="mb-20 w-full text-[1.8rem]">
      <CustomSlider
        endpoint={`${mediaMode}/${id}/recommendations`}
        title={<SectionHeading icon={Icons.play}>{`Similar ${kind}`}</SectionHeading>}
        mediaMode={mediaMode}
        breakpoints={DISCOVER_BREAKPOINTS}
      />
    </section>
  );
};

export default SimilarMedia;
