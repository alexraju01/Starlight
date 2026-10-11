'use client';

import clsx from 'clsx';
import { Clapperboard, House, LayoutGrid, Tv } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { links } from '@/constants';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  '/': House,
  '/movie': Clapperboard,
  '/tv': Tv,
  '/genre': LayoutGrid,
};

interface NavLinksProps {
  /** `bar`: compact pills in the desktop navbar. `drawer`: large rows with icons. */
  variant: 'bar' | 'drawer';
  onLinkClick?: () => void;
}

const NavLinks = ({ variant, onLinkClick }: NavLinksProps) => {
  const pathname = usePathname();

  return (
    <ul className={variant === 'bar' ? 'flex items-center gap-[4px]' : 'flex flex-col gap-[4px]'}>
      {links.map((link) => {
        const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
        const Icon = ICONS[link.href];

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={isActive ? 'page' : undefined}
              onClick={onLinkClick}
              className={clsx(
                'relative flex items-center font-medium whitespace-nowrap transition-colors',
                variant === 'bar'
                  ? [
                      'h-[40px] rounded-full px-[16px] text-[15px]',
                      // Active: brighter label with a short red underline, not a filled block.
                      isActive
                        ? 'after:bg-primary bg-white/[0.08] text-white after:absolute after:inset-x-[16px] after:bottom-[5px] after:h-[2px] after:rounded-full'
                        : 'text-white/65 hover:bg-white/[0.05] hover:text-white',
                    ]
                  : [
                      'h-[48px] gap-[14px] rounded-[10px] px-[14px] text-[16px]',
                      isActive
                        ? 'before:bg-primary bg-white/[0.08] text-white before:absolute before:inset-y-[12px] before:left-0 before:w-[3px] before:rounded-full'
                        : 'text-white/75 hover:bg-white/[0.05] hover:text-white',
                    ],
              )}
            >
              {variant === 'drawer' && Icon && (
                <Icon
                  aria-hidden="true"
                  className={clsx('size-[20px]', isActive ? 'text-primary' : 'text-white/50')}
                />
              )}
              {link.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLinks;
