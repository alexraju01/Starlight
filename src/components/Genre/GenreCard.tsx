import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FaQuestionCircle } from 'react-icons/fa';

import type { Route } from 'next';

interface GenreCardProps {
  name: string;
  href: Route;
  /** Null shows a tinted fallback with the icon. */
  backdrop: string | null;
  /** Accent colour (hex), from constants/genreTints. */
  tint: string;
  coverage: string;
  featuredTitle: string | null;
  /** Up to three, fanned out on hover. */
  posters: string[];
  icon?: React.ReactNode;
  priority?: boolean;
  /** Image `sizes` for the tile's grid slot. */
  sizes: string;
}

/** Fanned poster positions: rotation (deg) and horizontal offset (px), back to front. */
const FAN = [
  [-12, -30],
  [12, 30],
  [0, 0],
] as const;

/** Genre tile washed in the genre's colour; its top posters fan up on hover. Fills its cell. */
export default function GenreCard({
  name,
  href,
  backdrop,
  tint,
  coverage,
  featuredTitle,
  posters,
  icon,
  priority,
  sizes,
}: GenreCardProps) {
  return (
    <Link
      href={href}
      style={{ '--tint': tint } as React.CSSProperties}
      className="group bg-card-bg relative isolate flex h-full w-full flex-col justify-end overflow-hidden rounded-[16px] ring-1 ring-white/[0.08] transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[4px] hover:shadow-[0_20px_48px_-16px_var(--tint)] hover:ring-[color:var(--tint)]/60 focus-visible:ring-2 focus-visible:ring-[color:var(--tint)]"
    >
      {backdrop ? (
        <Image
          src={backdrop}
          alt=""
          fill
          priority={priority}
          sizes={sizes}
          className="-z-10 object-cover transition-[scale,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:blur-[2px] group-hover:brightness-75"
        />
      ) : (
        <div
          aria-hidden="true"
          className="bg-panel absolute inset-0 -z-10 flex items-center justify-center"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 25%, ${tint}55, ${tint}00 65%)`,
          }}
        >
          <span className="text-[72px] text-white/[0.06]">{icon ?? <FaQuestionCircle />}</span>
        </div>
      )}
      {/* Desktop only (no room beside the title on narrow tiles); under the scrims so text stays legible. */}
      {posters.length > 0 && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[16%] bottom-0 -z-10 hidden h-[78%] w-[34%] translate-y-[24%] opacity-0 transition-[opacity,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[6%] group-hover:opacity-100 lg:block"
        >
          {posters.slice(0, 3).map((poster, i) => {
            const [rotate, x] = FAN[3 - Math.min(posters.length, 3) + i] ?? FAN[2];
            return (
              <div
                key={poster}
                className="absolute bottom-0 left-1/2 aspect-[2/3] h-full overflow-hidden rounded-[8px] shadow-[0_12px_28px_rgba(0,0,0,0.6)] ring-1 ring-white/20 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateX(calc(-50% + ${x}%)) rotate(${rotate}deg)` }}
              >
                <Image src={poster} alt="" fill sizes="120px" className="object-cover" />
              </div>
            );
          })}
        </div>
      )}

      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/40 to-black/5" />
      <div
        className="absolute inset-0 -z-10 opacity-70 mix-blend-soft-light transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(35deg, ${tint} 0%, ${tint}00 65%)` }}
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3"
        style={{ background: `linear-gradient(to top, ${tint}40, ${tint}00)` }}
      />

      <span
        aria-hidden="true"
        className="text-secondary absolute top-[14px] right-[14px] flex size-[36px] translate-y-[4px] items-center justify-center rounded-full bg-white opacity-0 transition-[opacity,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100"
      >
        <ArrowUpRight className="size-[18px]" />
      </span>

      <div className="flex flex-col gap-[8px] p-[16px] lg:p-[18px]">
        <span
          aria-hidden="true"
          className="flex size-[34px] items-center justify-center rounded-full border border-[color:var(--tint)]/50 bg-[color:var(--tint)]/20 text-[14px] text-white backdrop-blur-md"
        >
          {icon ?? <FaQuestionCircle />}
        </span>
        <h3 className="text-[18px] leading-[1.1] font-bold tracking-[-0.01em] text-white lg:text-[20px]">
          {name}
        </h3>
        <p className="text-[13px] font-medium text-white/80">{coverage}</p>
        {featuredTitle && (
          <p className="-mt-[4px] line-clamp-1 text-[12px] text-white/55">
            Trending: {featuredTitle}
          </p>
        )}
      </div>
    </Link>
  );
}
