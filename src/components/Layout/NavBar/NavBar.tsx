'use client';

import { AlignJustify, X, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import SearchBox from '@/components/ui/SearchBox/SearchBox';
import { useNavBarLogic } from '@/hooks/useNavBarLogic';

import Logo from './Logo';
import MobileControls from './MobileControls';
import MobileOverlays from './MobileOverlays';
import NavLinks from './NavLinks';

const NavBar = () => {
  const { isMobileNavOpen, setIsMobileNavOpen, isSearchOpen, toggleMobileNav, toggleSearch, refs } =
    useNavBarLogic();

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-[#100F10]">
      <nav className="relative flex w-full flex-col items-start justify-between gap-4 px-6 py-4 md:flex-row md:items-center md:gap-10 lg:px-10">
        <MobileControls>
          {/* 1. Mobile Menu Toggle */}
          <Button
            size="default"
            ref={refs.mobileMenuButtonRef}
            onClick={toggleMobileNav}
            className="cursor-pointer px-5 py-7 text-white lg:hidden"
          >
            {isMobileNavOpen ? <X size={20} /> : <AlignJustify size={20} />}
          </Button>

          <Logo />

          {/* 2. Search Toggle  */}
          <button
            ref={refs.searchButtonRef}
            onClick={(e) => {
              e.stopPropagation();
              toggleSearch();
            }}
            className="ml-auto text-white lg:hidden"
          >
            <Search
              size={26}
              className="cursor-pointer text-[#AAAAAA] transition-all duration-300 hover:text-white"
            />
          </button>
        </MobileControls>

        {/* Desktop View */}
        {/* Desktop View */}
        <NavLinks className="hidden lg:flex" />
        {/* <div className="hidden lg:flex items-center gap-6 xl:gap-10">
          <NavLinks />
        </div> */}

        <div className="hidden flex-1 items-center justify-end gap-5 lg:flex">
          <SearchBox />
        </div>
      </nav>

      <MobileOverlays
        isSearchOpen={isSearchOpen}
        isMobileNavOpen={isMobileNavOpen}
        setIsMobileNavOpen={setIsMobileNavOpen}
        searchWrapperRef={refs.searchWrapperRef}
        mobileNavRef={refs.mobileNavRef}
      />
    </header>
  );
};

export default NavBar;
