import SectionHeading from '@/components/Navigation/SectionHeading';
import { DISCOVER_BREAKPOINTS } from '@/constants/breakpoints';
import { MediaMode } from '@/types/mediaMode';

import CustomSlider from '../CustomSlider/CustomSlider';

interface Props {
  mediaMode: MediaMode;
  id: number;
}

/** Recommendations slider; also the target of the hero's "More like this" link. */
const SimilarMedia = ({ mediaMode, id }: Props) => (
  // The slider insets its header and cards by 5px; pull it out so it lines up with the
  // other sections. scroll-mt keeps the heading clear of the fixed navbar.
  <section id="similar" className="-mx-[5px] scroll-mt-[calc(var(--nav-h)+24px)]">
    <CustomSlider
      endpoint={`${mediaMode}/${id}/recommendations`}
      title={<SectionHeading>More like this</SectionHeading>}
      mediaMode={mediaMode}
      breakpoints={DISCOVER_BREAKPOINTS}
    />
  </section>
);

export default SimilarMedia;
