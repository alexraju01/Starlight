'use client';

import { AlignJustify, X, Search } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import SearchBox from '@/components/ui/SearchBox/SearchBox';
import { ROUTES } from '@/constants/route';

import NavLinks from './NavLinks';

const NavBar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement | null>(null);

  const toggleMobileNav = () => {
    setIsMobileNavOpen((prev) => !prev);
    setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    setIsMobileNavOpen(false);
  };

  // Close search on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Close search on outside click
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  // Outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#100F10]">
      {/* NAV BAR */}
      <nav
        className="flex relative flex-col md:flex-row gap-4 md:gap-10 justify-between items-start md:items-center w-full px-6 lg:px-10 py-4"
        aria-label="Main Navigation"
      >
        {/* Logo + Mobile Menu */}
        <div className="flex items-center w-full lg:w-auto">
          <div className="flex gap-5">
            <button
              onClick={toggleMobileNav}
              className="lg:hidden text-white"
              aria-label={isMobileNavOpen ? 'Close Menu' : 'Open Menu'}
            >
              {isMobileNavOpen ? <X size={32} /> : <AlignJustify size={32} />}
            </button>

            <Link href={ROUTES.HOME} className="mx-auto">
              <span className="text-[26px] lg:text-[29px] xl:text-[44.87px] font-bold">
                <span className="text-primary">S</span>tar
                <span className="text-primary">L</span>ight
              </span>
            </Link>
          </div>

          {/* 🔍 Mobile / Tablet Search Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSearch();
            }}
            className="lg:hidden text-white ml-auto"
            aria-label="Open search"
            aria-expanded={isSearchOpen}
          >
            <Search size={26} />
          </button>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-10">
          <NavLinks />
        </div>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex items-center gap-5 flex-1 justify-end">
          <SearchBox />
          <Link
            href={ROUTES.LOGIN}
            className="text-xl px-4 py-2 border border-[#1D1D1D] rounded-xl text-[#BFBFBF] hover:text-white"
          >
            Login
          </Link>
        </div>
      </nav>

      {/*  MOBILE / TABLET SLIDE-DOWN SEARCH */}
      <div
        ref={searchRef}
        className={`relative lg:hidden transition-all duration-300 ease-in-out bg-[#0E0E0E] ${
          isSearchOpen ? 'max-h-[100vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4">
          <SearchBox />
        </div>
      </div>

      {/* 📱 MOBILE NAV */}
      <div
        className={`lg:hidden relative transition-all duration-300 ease-in-out ${
          isMobileNavOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="absolute w-full bg-[#100F10] p-6">
          <NavLinks className="flex flex-col gap-4" onLinkClick={() => setIsMobileNavOpen(false)} />
          <Link
            href={ROUTES.LOGIN}
            className="block mt-4 text-center px-4 py-2 border border-[#1D1D1D] rounded-xl text-[#BFBFBF]"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
