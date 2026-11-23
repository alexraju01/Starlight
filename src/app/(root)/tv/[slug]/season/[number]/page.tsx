import { Metadata } from 'next';

import EpisodeList from '@/components/Season/EpisodeList';
import SeasonHero from '@/components/Season/SeasonHero';
import SeasonPager from '@/components/Season/SeasonPager';
import SeasonSwitcher from '@/components/Season/SeasonSwitcher';
import { MediaMode } from '@/types/mediaMode';
import { displayName } from '@/utils/media';
import { jsonLdString } from '@/utils/mediaPage';
import { buildSeasonJsonLd, buildSeasonMetadata, getSeasonOrNotFound } from '@/utils/seasonPage';
import { orderSeasons } from '@/utils/seasons';

interface PageProps {
  params: Promise<{ slug: string; number: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, number } = await params;
  const { show, season } = await getSeasonOrNotFound(slug, number);
  return buildSeasonMetadata(show, season);
}

/** One season of a show: overview, every episode, and links to the other seasons. */
export default async function SeasonPage({ params }: PageProps) {
  const { slug, number } = await params;
  const { show, season } = await getSeasonOrNotFound(slug, number);
  const showName = displayName(show);
  const seasons = orderSeasons(show.media_type === MediaMode.TV ? show.seasons : []);

  return (
    <article className="pb-[48px] lg:pb-[72px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(buildSeasonJsonLd(show, season)) }}
      />
      <SeasonHero show={show} season={season}>
        <SeasonSwitcher
          showId={show.id}
          showName={showName}
          seasons={seasons}
          current={season.season_number}
        />
      </SeasonHero>

      <div className="page-gutter mt-[24px] flex max-w-[1200px] flex-col gap-[40px] lg:mt-[40px]">
        <EpisodeList episodes={season.episodes} />
        <SeasonPager
          showId={show.id}
          showName={showName}
          seasons={seasons}
          current={season.season_number}
        />
      </div>
    </article>
  );
}
