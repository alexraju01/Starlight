'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { links } from '@/constants';

interface NavLinksProps {
  onLinkClick?: () => void;
  className?: string;
}

const NavLinks = ({ onLinkClick, className = '' }: NavLinksProps) => {
  const pathname = usePathname();

  return (
    <ul className={`gap-3 lg:flex lg:flex-row lg:items-center xl:gap-5 ${className}`}>
      {links.map((link) => {
        const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);

        return (
          <li key={link.href}>
            <Link
              href={link.href as any}
              aria-current={isActive ? 'page' : undefined}
              onClick={onLinkClick}
              className={`font-Helvetica inline-block cursor-pointer rounded-md px-4 py-2.5 text-[16px] whitespace-nowrap transition-all duration-300 ease-in-out xl:px-6 xl:py-[14px] xl:text-[18px] ${isActive ? 'bg-primary text-white' : 'text-[#BFBFBF] hover:text-white'} `}
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
