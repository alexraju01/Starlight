'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LinkData {
  href: string;
  icon: React.ReactNode;
  name: string;
}

interface NavLinksProps {
  linkData: LinkData;
  closeSidebar?: () => void;
}

export default function NavLinks({ linkData, closeSidebar }: NavLinksProps) {
  const path = usePathname();
  const isActive = path === linkData.href;

  const handleClick = () => {
    if (closeSidebar) {
      closeSidebar();
    }
  };

  return (
    <li role="listitem" className="flex h-14 w-full items-center justify-center px-4 text-xl">
      <Link
        href={linkData.href as any}
        onClick={handleClick}
        className={`-4 flex h-full w-full items-center gap-4 rounded-xl px-4 transition-all ${isActive ? 'bg-[#1c1b1c] text-white' : 'text-[#515256]'} hover:bg-[#1c1b1c] hover:text-white`}
      >
        <span className={`flex w-1/5 justify-end ${isActive ? 'text-primary' : ''}`}>
          {linkData.icon}
        </span>
        <p className="flex w-1/2 justify-start">{linkData.name}</p>
      </Link>
    </li>
  );
}
