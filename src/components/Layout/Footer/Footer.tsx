import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import Logo from '@/components/Layout/NavBar/Logo';
import { QUICK_GENRES, links } from '@/constants';
import { ROUTES } from '@/constants/route';
import { SITE_NAME } from '@/constants/site';

import type { Route } from 'next';

interface LinkGroup {
  title: string;
  /** Long list: full width with two link columns on phones. */
  wide?: boolean;
  links: { name: string; href: Route }[];
}

const GROUPS: LinkGroup[] = [
  {
    title: 'Browse',
    links: [...links, { name: 'Discover', href: ROUTES.DISCOVER_HOME }],
  },
  {
    title: 'Explore',
    links: [
      { name: 'Top rated movies', href: '/movie?sort=top_rated' as Route },
      { name: 'New movie releases', href: '/movie?sort=newest' as Route },
      { name: 'Top rated TV shows', href: '/tv?sort=top_rated' as Route },
      { name: 'New TV shows', href: '/tv?sort=newest' as Route },
    ],
  },
  {
    title: 'Popular genres',
    wide: true,
    links: QUICK_GENRES.slice(0, 6).map((name) => ({ name, href: ROUTES.GENRE(name) })),
  },
];

export default function Footer() {
  return (
    <footer className="relative z-1 border-t border-white/[0.06] bg-[#0c0b0c] text-white">
      <div className="page-gutter pt-[48px] pb-[max(32px,env(safe-area-inset-bottom))] lg:pt-[64px]">
        <div className="grid gap-[40px] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,3fr)] lg:gap-[64px]">
          <div className="flex flex-col gap-[16px]">
            <Logo />
            <p className="max-w-[36ch] text-[14px] leading-[1.6] text-white/55 lg:text-[15px]">
              Discover trending movies and TV shows, watch trailers and find your next favourite
              story.
            </p>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[8px] flex w-fit items-center gap-[12px] rounded-[10px] border border-white/[0.08] bg-white/[0.03] px-[14px] py-[10px] transition-colors hover:border-white/20"
            >
              <Image
                src="/images/TMDB-Primary-Short.svg"
                alt="The Movie Database (TMDB)"
                height={18}
                width={44}
              />
              <span className="max-w-[26ch] text-[12px] leading-[1.45] text-white/50">
                Uses the TMDB API but is not endorsed or certified by TMDB.
              </span>
            </a>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-[24px] gap-y-[32px] sm:grid-cols-3"
          >
            {GROUPS.map((group) => (
              <div
                key={group.title}
                className={clsx(
                  'flex flex-col gap-[16px]',
                  group.wide && 'col-span-2 sm:col-span-1',
                )}
              >
                <h2 className="text-[12px] font-semibold tracking-[0.08em] text-white/40 uppercase">
                  {group.title}
                </h2>
                <ul
                  className={clsx(
                    'gap-[12px]',
                    group.wide
                      ? 'grid grid-cols-2 gap-x-[24px] sm:flex sm:flex-col'
                      : 'flex flex-col',
                  )}
                >
                  {group.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-[14px] text-white/70 transition-colors hover:text-white lg:text-[15px]"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-[48px] flex flex-col gap-[8px] border-t border-white/[0.06] pt-[24px] text-[13px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p>Movie and TV data provided by TMDB.</p>
        </div>
      </div>
    </footer>
  );
}
