'use client';

import { AlignJustify, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import SearchBox from '@/components/ui/SearchBox/SearchBox';
import { ROUTES } from '@/constants/route';

import NavLinks from './NavLinks';

const NavBar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen((prev) => !prev);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#100F10] px-6 lg:px-10 py-4">
      <nav
        className=" flex relative flex-col md:flex-row gap-4 md:gap-10 justify-between items-start md:items-center w-full"
        aria-label="Main Navigation"
      >
        {/* Logo & Mobile Toggle */}
        <div className="flex items-center w-full  md:w-auto">
          <button
            onClick={toggleMobileNav}
            className="md:hidden text-white"
            aria-label={isMobileNavOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={isMobileNavOpen}
            aria-controls="mobile-menu"
          >
            {isMobileNavOpen ? <X size={35} /> : <AlignJustify size={35} />}
          </button>

          <Link href={ROUTES.HOME} aria-label="Go to homepage" className="mx-auto">
            <span className="text-[26px] lg:text-[29px] xl:text-[44.87px] font-bold leading-[101%]">
              <span className="text-primary">S</span>tar
              <span className="text-primary">L</span>ight
            </span>
          </Link>
        </div>

        {/* Mobile SearchBox under logo */}
        <div className="md:hidden bg-[#100F10] absolute z-0 w-full mt-18">
          <div className="p-4 rounded-lg">
            <SearchBox />
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 xl:gap-10">
          <NavLinks />
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex justify-end items-center gap-3 xl:gap-5 flex-1">
          <SearchBox />

          <div className="relative group">
            <Link
              href={ROUTES.LOGIN}
              className="text-xl xl:text-2xl px-[18px] py-[10px] font-medium text-[#BFBFBF] hover:text-white transition-colors w-[110px] h-[50px] rounded-[12px] border border-[#1D1D1D] flex items-center justify-center"
            >
              Login
            </Link>
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Future Feature
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Links */}
      <div
        id="mobile-menu"
        className={`md:hidden relative transition-all duration-300 ease-in-out ${
          isMobileNavOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
        role="region"
        aria-hidden={!isMobileNavOpen}
      >
        <div className="w-full  bg-[#100F10] p-6 z-[10] absolute">
          <NavLinks className="flex flex-col gap-4" onLinkClick={() => setIsMobileNavOpen(false)} />

          <div className="mt-4 flex flex-col gap-4">
            <Link
              href={ROUTES.LOGIN}
              className="text-lg px-[18px] py-[10px] font-medium text-[#BFBFBF] hover:text-white transition-colors w-full rounded-[12px] border border-[#1D1D1D] text-center"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
