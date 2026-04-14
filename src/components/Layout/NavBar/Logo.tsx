import Link from 'next/link';

import { ROUTES } from '@/constants/route';

const Logo = () => {
  return (
    <Link href={ROUTES.HOME}>
      <span className="text-[26px] font-bold text-white lg:text-[29px] xl:text-[44.87px]">
        <span className="text-primary">S</span>tar
        <span className="text-primary">L</span>ight
      </span>
    </Link>
  );
};

export default Logo;
