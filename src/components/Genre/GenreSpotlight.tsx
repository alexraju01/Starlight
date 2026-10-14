'use client';

import clsx from 'clsx';
import { ArrowRight, Shuffle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { buttonClass } from '@/components/ui/buttonStyles';
import { prefersReducedMotion } from '@/utils/motion';

import PosterFan from './PosterFan';

import type { Route } from 'next';

export interface SpotlightGenre {
  name: string;
  href: Route;
  tint: string;
  backdrop: string | null;
  posters: string[];
  coverage: string;
  featuredTitle: string | null;
}

interface Props {
  genres: SpotlightGenre[];
  /** Every genre page, for "Surprise me". */
  allHrefs: Route[];
}

const ROTATE_MS = 7000;

/**
 * "What are you in the mood for?" hero: cross-fades between headline genres, auto-rotating
 * with a progress bar on the active chip. Pauses on hover/focus, in a background tab and
 * for reduced motion.
 */
export default function GenreSpotlight({ genres, allHrefs }: Props) {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const genre = genres[active];
  const isHalted = isPaused || isHidden;

  useEffect(() => {
    setReduceMotion(prefersReducedMotion());
    const onVisibility = () => setIsHidden(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // Restarts on every change, so a picked chip gets a full turn.
  useEffect(() => {
    if (isHalted || reduceMotion || genres.length < 2) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % genres.length), ROTATE_MS);
    return () => window.clearTimeout(id);
  }, [active, isHalted, reduceMotion, genres.length]);

  const surprise = () => {
    const others = allHrefs.filter((href) => href !== genre.href);
    const pool = others.length > 0 ? others : allHrefs;
    router.push(pool[Math.floor(Math.random() * pool.length)]);
  };

  return (
    <section
      aria-label="Genre spotlight"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      style={{ '--tint': genre.tint } as React.CSSProperties}
      className="relative isolate flex min-h-[560px] items-end overflow-hidden transition-[--tint] duration-1000 lg:min-h-[min(720px,calc(100svh-var(--nav-h)))]"
    >
      {genres.map((g, i) => (
        <div
          key={g.name}
          aria-hidden="true"
          className={clsx(
            'absolute inset-0 -z-20 transition-opacity duration-1000',
            i === active ? 'opacity-100' : 'opacity-0',
          )}
        >
          {g.backdrop && (
            <Image
              src={g.backdrop}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className={clsx(
                'object-cover object-[center_25%]',
                i === active && 'animate-[spotlight-zoom_9s_ease-out_forwards]',
              )}
            />
          )}
        </div>
      ))}
      <div className="from-secondary via-secondary/80 lg:via-secondary/55 absolute inset-0 -z-10 bg-gradient-to-r to-transparent" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-60 mix-blend-screen"
        style={{
          background:
            'radial-gradient(70% 90% at 0% 100%, color-mix(in srgb, var(--tint) 55%, transparent), transparent 70%)',
        }}
      />
      <div className="from-secondary absolute inset-0 -z-10 bg-gradient-to-t via-transparent to-transparent" />

      {/* Keyed so it replays for each genre. */}
      <PosterFan
        key={genre.name}
        posters={genre.posters}
        className="absolute right-[68px] bottom-[64px] hidden h-[340px] w-[420px] lg:block 2xl:right-[101px]"
      />

      <div className="page-gutter relative w-full pt-[48px] pb-[40px] lg:pb-[64px]">
        <p className="text-[13px] font-semibold tracking-[0.14em] text-white/60 uppercase">
          Genres
        </p>
        <h1 className="mt-[12px] max-w-[14ch] text-[clamp(36px,6vw,76px)] leading-[0.98] font-extrabold tracking-[-0.03em] text-balance text-white">
          What are you in the mood for?
        </h1>

        <div
          role="group"
          aria-label="Spotlight genre"
          className="mt-[28px] flex flex-wrap gap-[8px]"
        >
          {genres.map((g, i) => {
            const isActive = i === active;
            return (
              <button
                key={g.name}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                style={{ '--chip': g.tint } as React.CSSProperties}
                className={clsx(
                  'relative h-[40px] overflow-hidden rounded-full border px-[16px] text-[14px] font-medium backdrop-blur-md transition-colors',
                  isActive
                    ? 'border-[color:var(--chip)] bg-[color:var(--chip)]/25 text-white'
                    : 'border-white/15 bg-black/30 text-white/75 hover:border-white/35 hover:text-white',
                )}
              >
                {g.name}
                {isActive && !reduceMotion && (
                  <span
                    key={active}
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[color:var(--chip)]"
                    style={{
                      animation: `chip-progress ${ROTATE_MS}ms linear forwards`,
                      animationPlayState: isHalted ? 'paused' : 'running',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div
          key={genre.name}
          aria-live="polite"
          className="animate-in fade-in slide-in-from-bottom-2 mt-[24px] duration-500"
        >
          <p className="text-[15px] text-white/75">
            <span className="font-semibold text-white">{genre.coverage}</span>
            {genre.featuredTitle && <> · Trending now: {genre.featuredTitle}</>}
          </p>
        </div>

        <div className="mt-[20px] flex flex-col gap-[12px] sm:flex-row">
          <Link href={genre.href} className={buttonClass('light', 'lg')}>
            Explore {genre.name}
            <ArrowRight aria-hidden="true" className="size-[18px]" />
          </Link>
          <button
            type="button"
            onClick={surprise}
            className={buttonClass('ghost', 'lg', 'backdrop-blur-md')}
          >
            <Shuffle aria-hidden="true" className="size-[18px]" />
            Surprise me
          </button>
        </div>
      </div>
    </section>
  );
}
