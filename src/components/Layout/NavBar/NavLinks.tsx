'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { links } from '@/constants';
import { cn } from '@/lib/utils';

const NavLinks = ({
  className = '',
  onLinkClick,
}: {
  className?: string;
  onLinkClick?: () => void;
}) => {
  const pathname = usePathname();

  return (
    <ul
      className={cn(
        'flex flex-col md:flex-row md:items-center md:gap-3 md:px-2 md:py-1.5 md:rounded-2xl xl:gap-5 xl:px-2.5 xl:py-2.5',
        className,
      )}
    >
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <li key={link.href}>
            <Link
              href={link.href as any}
              aria-current={isActive ? 'page' : undefined}
              onClick={onLinkClick}
              className={cn(
                'inline-block whitespace-nowrap text-[16px] xl:text-[18px] font-Helvetica leading-[150%] px-4 py-2.5 xl:px-6 xl:py-[14px] rounded-md transition-colors duration-200',
                isActive ? 'bg-primary text-white' : 'text-[#BFBFBF] hover:text-white',
              )}
            >
              {link.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLinks;
