import Image from 'next/image';
import Link from 'next/link';

import { links } from '@/constants';

const Footer = () => {
  return (
    <footer className="relative z-1 mt-10 border-t border-white/10 px-6 pt-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] text-[14px] text-gray-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href as never}
                  className="transition-colors hover:text-white"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/discover" className="transition-colors hover:text-white">
                Search
              </Link>
            </li>
          </ul>
        </nav>

        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="The Movie Database (TMDB)"
        >
          <Image
            src="/images/TMDB-Primary-Short.svg"
            alt="The Movie Database (TMDB)"
            height={21}
            width={50}
          />
        </a>
        <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
        <p>© {new Date().getFullYear()} Starlight. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
