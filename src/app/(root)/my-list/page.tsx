import { Metadata } from 'next';

import PageHeader from '@/components/Layout/PageHeader';
import MyListView from '@/components/Library/MyListView';
import { api } from '@/utils/api';

export const metadata: Metadata = {
  title: 'My List',
  description: 'Movies and TV shows you’ve saved to watch later.',
  // Personal to each visitor (stored in their browser): nothing for search engines.
  robots: { index: false, follow: true },
};

/** Saved titles. The list itself lives in the visitor's browser; the server only adds genre names. */
export default async function MyListPage() {
  const { genresMap } = await api.genre.getAllGenres().catch(() => ({ genresMap: {} }));

  return (
    <div className="animate-fadeIn pb-[48px] lg:pb-[72px]">
      <PageHeader
        title="My List"
        description="Everything you’ve saved to watch later. Saved in this browser – no account needed."
      />
      <section aria-label="Saved titles" className="page-gutter pt-[24px] lg:pt-[32px]">
        <MyListView genreMap={genresMap} />
      </section>
    </div>
  );
}
