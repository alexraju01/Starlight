import Link from 'next/link';

import { ROUTES } from '@/constants/route';

export default function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href={ROUTES.HOME} onClick={onClick} aria-label="StarLight home" className="shrink-0">
      <span className="text-[24px] leading-none font-bold tracking-[-0.01em] text-white lg:text-[28px]">
        <span className="text-primary">S</span>tar
        <span className="text-primary">L</span>ight
      </span>
    </Link>
  );
}
