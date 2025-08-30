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
    <li role="listitem" className="w-full h-14 flex justify-center px-4  items-center text-xl">
      <Link
        href={linkData.href}
        onClick={handleClick}
        className={`flex items-center -4 w-full h-full gap-4 px-4 rounded-xl transition-all
					${isActive ? 'text-white bg-[#1c1b1c]' : 'text-[#515256]'}
					hover:text-white hover:bg-[#1c1b1c]`}
      >
        <span className={`flex justify-end w-1/5 ${isActive ? 'text-primary' : ''}`}>
          {linkData.icon}
        </span>
        <p className="flex justify-start w-1/2">{linkData.name}</p>
      </Link>
    </li>
  );
}
