import clsx from 'clsx';
import Link from 'next/link';

import type { Route } from 'next';

type Size = 'sm' | 'md';

const GROUP: Record<Size, string> = {
  // Full width on phones, shrink-wrapped from `sm`.
  md: 'grid shrink-0 auto-cols-fr grid-flow-col p-[4px] sm:inline-grid sm:w-fit',
  sm: 'inline-grid auto-cols-fr grid-flow-col p-[3px]',
};

const ITEM: Record<Size, string> = {
  md: 'h-[36px] px-[16px] text-[14px]',
  sm: 'h-[32px] px-[14px] text-[13px]',
};

const groupClass = (size: Size) =>
  clsx('rounded-[10px] border border-white/10 bg-white/[0.04]', GROUP[size]);

const itemClass = (size: Size, active: boolean) =>
  clsx(
    'group flex items-center justify-center gap-[6px] rounded-[7px] font-medium whitespace-nowrap transition-colors',
    ITEM[size],
    active ? 'text-secondary bg-white' : 'text-white/70 hover:text-white',
  );

export interface SegmentLink {
  key: string;
  label: React.ReactNode;
  href: Route;
  active: boolean;
}

/**
 * Segmented control made of links (sort order, media type…). URL-driven, so every state
 * is shareable, server-rendered and works with back/forward.
 */
export function SegmentedLinks({ label, options }: { label: string; options: SegmentLink[] }) {
  return (
    <div role="group" aria-label={label} className={groupClass('md')}>
      {options.map((option) => (
        <Link
          key={option.key}
          href={option.href}
          scroll={false}
          aria-current={option.active ? 'true' : undefined}
          className={itemClass('md', option.active)}
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}

interface ButtonsProps<T extends string> {
  /** Accessible name for the group. */
  label: string;
  /** Labels can style themselves for the active state with `group-aria-pressed:`. */
  options: { value: T; label: React.ReactNode }[];
  value: T;
  onChange: (value: T) => void;
  size?: Size;
}

/** Segmented control for client-side state (a toggle between views of the same data). */
export function SegmentedButtons<T extends string>({
  label,
  options,
  value,
  onChange,
  size = 'md',
}: ButtonsProps<T>) {
  return (
    <div role="group" aria-label={label} className={groupClass(size)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          aria-pressed={option.value === value}
          className={itemClass(size, option.value === value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
