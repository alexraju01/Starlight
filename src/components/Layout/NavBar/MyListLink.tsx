'use client';

import clsx from 'clsx';
import { Bookmark } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ROUTES } from '@/constants/route';
import { useMyList } from '@/hooks/useLibrary';

/** Bookmark icon in the navbar with the number of saved titles. */
export default function MyListLink({ className }: { className?: string }) {
  const count = useMyList()?.length ?? 0;
  const isActive = usePathname() === ROUTES.MY_LIST;

  return (
    <Link
      href={ROUTES.MY_LIST}
      aria-label={count ? `My List, ${count} saved` : 'My List'}
      aria-current={isActive ? 'page' : undefined}
      className={clsx(
        'relative flex size-[40px] items-center justify-center rounded-full transition-colors hover:bg-white/10 hover:text-white',
        isActive ? 'bg-white/10 text-white' : 'text-white/80',
        className,
      )}
    >
      <Bookmark aria-hidden="true" className={clsx('size-[20px]', count > 0 && 'fill-current')} />
      {count > 0 && (
        <span
          aria-hidden="true"
          className="bg-primary absolute -top-[2px] -right-[2px] flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-[4px] text-[11px] leading-none font-bold text-white"
        >
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  );
}
