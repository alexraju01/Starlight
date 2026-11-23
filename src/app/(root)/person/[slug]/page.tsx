import { Metadata } from 'next';

import SectionHeading from '@/components/Navigation/SectionHeading';
import Filmography from '@/components/Person/Filmography';
import KnownForRow from '@/components/Person/KnownForRow';
import PersonFacts from '@/components/Person/PersonFacts';
import PersonHero from '@/components/Person/PersonHero';
import ExpandableText from '@/components/ui/ExpandableText';
import { jsonLdString } from '@/utils/mediaPage';
import { buildPersonJsonLd, buildPersonMetadata, getPersonOrNotFound } from '@/utils/personPage';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return buildPersonMetadata(await getPersonOrNotFound(slug));
}

/** Actor / crew page: profile, biography, best-known titles and full filmography. */
export default async function PersonPage({ params }: PageProps) {
  const { slug } = await params;
  const person = await getPersonOrNotFound(slug);

  return (
    <article className="pb-[48px] lg:pb-[72px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(buildPersonJsonLd(person)) }}
      />
      <PersonHero person={person} />

      <div className="page-gutter mt-[24px] grid grid-cols-1 gap-[40px] lg:mt-[40px] lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-[56px] 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex min-w-0 flex-col gap-[40px] lg:gap-[56px]">
          {person.biography && (
            <section aria-labelledby="biography-heading" className="flex flex-col gap-[16px]">
              <SectionHeading id="biography-heading">Biography</SectionHeading>
              <ExpandableText
                text={person.biography}
                className="max-w-[72ch] text-[15px] leading-[1.75] text-white/75 lg:text-[16px]"
              />
            </section>
          )}
          <KnownForRow credits={person.knownFor} />
          <Filmography credits={person.credits} mainDepartment={person.knownForDepartment} />
        </div>

        <aside>
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+24px)]">
            <PersonFacts person={person} />
          </div>
        </aside>
      </div>
    </article>
  );
}
