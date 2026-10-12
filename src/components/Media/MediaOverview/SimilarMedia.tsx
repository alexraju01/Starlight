import SectionHeading from '@/components/Navigation/SectionHeading';
import { MediaMode } from '@/types/mediaMode';

import MediaRow from '../MediaRow/MediaRow';

interface Props {
  mediaMode: MediaMode;
  id: number;
}

/** Recommendations slider; also the target of the hero's "More like this" link. */
export default function SimilarMedia({ mediaMode, id }: Props) {
  return (
    // scroll-mt keeps the heading clear of the fixed navbar.
    <section id="similar" className="scroll-mt-[calc(var(--nav-h)+24px)]">
      <MediaRow
        endpoint={`${mediaMode}/${id}/recommendations`}
        title={<SectionHeading>More like this</SectionHeading>}
        mediaMode={mediaMode}
      />
    </section>
  );
}
