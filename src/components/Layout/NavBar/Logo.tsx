import Link from 'next/link';

import { ROUTES } from '@/constants/route';
import { SITE_NAME } from '@/constants/site';

export default function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href={ROUTES.HOME}
      onClick={onClick}
      aria-label={`${SITE_NAME} home`}
      className="shrink-0"
    >
      <span className="text-[24px] leading-none font-bold tracking-[-0.01em] text-white lg:text-[28px]">
        <span className="text-primary">S</span>tar
        <span className="text-primary">L</span>ight
      </span>
    </Link>
  );
}
