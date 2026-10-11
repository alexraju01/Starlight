import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FaQuestionCircle } from 'react-icons/fa';

import type { Route } from 'next';

interface GenreCardProps {
  name: string;
  href: Route;
  /** Full TMDB backdrop URL, or null for the gradient fallback. */
  backdrop: string | null;
  icon?: React.ReactNode;
  priority?: boolean;
}

/** Artwork tile for the genres index: backdrop, scrim, icon badge and label. */
export default function GenreCard({ name, href, backdrop, icon, priority }: GenreCardProps) {
  return (
    <Link
      href={href}
      className="group relative block aspect-[16/10] overflow-hidden rounded-[14px] bg-[#1a1a1a] ring-1 ring-white/[0.08] transition-[box-shadow,transform] duration-300 hover:-translate-y-[2px] hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)] hover:ring-white/25"
    >
      {backdrop ? (
        <Image
          src={backdrop}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1536px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="from-primary/40 absolute inset-0 bg-gradient-to-br to-[#1a1a1a]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />

      <span
        aria-hidden="true"
        className="absolute top-[12px] left-[12px] flex size-[34px] items-center justify-center rounded-full bg-black/45 text-[15px] text-white ring-1 ring-white/15 backdrop-blur-md"
      >
        {icon ?? <FaQuestionCircle />}
      </span>

      <div className="absolute inset-x-[14px] bottom-[12px] flex items-end justify-between gap-[8px] lg:inset-x-[16px] lg:bottom-[14px]">
        <h3 className="text-[16px] leading-[1.2] font-semibold text-white lg:text-[18px]">
          {name}
        </h3>
        <ArrowRight
          aria-hidden="true"
          className="size-[18px] shrink-0 text-white/70 transition-transform duration-300 group-hover:translate-x-[3px] group-hover:text-white"
        />
      </div>
    </Link>
  );
}
