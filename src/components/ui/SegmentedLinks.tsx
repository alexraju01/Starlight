import clsx from 'clsx';
import Link from 'next/link';

import type { Route } from 'next';

export interface SegmentOption {
  key: string;
  label: React.ReactNode;
  href: Route;
  active: boolean;
}

interface Props {
  /** Accessible name for the group, e.g. "Sort by". */
  label: string;
  options: SegmentOption[];
}

/**
 * Segmented control made of links (sort order, media type…). Server-rendered and
 * URL-driven, so each state is shareable and works with back/forward.
 */
export default function SegmentedLinks({ label, options }: Props) {
  return (
    <div
      role="group"
      aria-label={label}
      className="grid shrink-0 auto-cols-fr grid-flow-col rounded-[10px] border border-white/10 bg-white/[0.04] p-[4px] sm:inline-grid sm:w-fit"
    >
      {options.map((option) => (
        <Link
          key={option.key}
          href={option.href}
          scroll={false}
          aria-current={option.active ? 'true' : undefined}
          className={clsx(
            'flex h-[36px] items-center justify-center rounded-[7px] px-[16px] text-[14px] font-medium whitespace-nowrap transition-colors',
            option.active ? 'text-secondary bg-white' : 'text-white/70 hover:text-white',
          )}
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}
