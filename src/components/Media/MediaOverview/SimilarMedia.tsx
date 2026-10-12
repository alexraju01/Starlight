import SectionHeading from '@/components/Navigation/SectionHeading';
import { MediaMode } from '@/types/mediaMode';

import CustomSlider from '../CustomSlider/CustomSlider';

interface Props {
  mediaMode: MediaMode;
  id: number;
}

/** Recommendations slider; also the target of the hero's "More like this" link. */
const SimilarMedia = ({ mediaMode, id }: Props) => (
  // scroll-mt keeps the heading clear of the fixed navbar.
  <section id="similar" className="scroll-mt-[calc(var(--nav-h)+24px)]">
    <CustomSlider
      endpoint={`${mediaMode}/${id}/recommendations`}
      title={<SectionHeading>More like this</SectionHeading>}
      mediaMode={mediaMode}
    />
  </section>
);

export default SimilarMedia;
