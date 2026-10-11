'use client';

import { AlignJustify, X, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import SearchBox from '@/components/ui/SearchBox/SearchBox';
import { useTrackInAppNavigation } from '@/hooks/useInAppHistory';
import { useNavBarLogic } from '@/hooks/useNavBarLogic';

import Logo from './Logo';
import MobileControls from './MobileControls';
import MobileOverlays from './MobileOverlays';
import NavLinks from './NavLinks';

const NavBar = () => {
  const { isMobileNavOpen, setIsMobileNavOpen, isSearchOpen, toggleMobileNav, toggleSearch, refs } =
    useNavBarLogic();
  useTrackInAppNavigation();

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-[#100F10]">
      <div className="relative flex w-full flex-col items-start justify-between gap-4 px-6 py-4 md:flex-row md:items-center md:gap-10 lg:px-10">
        <MobileControls>
          {/* 1. Mobile Menu Toggle */}
          <Button
            size="default"
            ref={refs.mobileMenuButtonRef}
            onClick={toggleMobileNav}
            aria-label={isMobileNavOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileNavOpen}
            aria-controls="mobile-nav"
            className="cursor-pointer px-5 py-7 text-white lg:hidden"
          >
            {isMobileNavOpen ? <X size={20} /> : <AlignJustify size={20} />}
          </Button>

          <Logo />

          {/* 2. Search Toggle  */}
          <button
            ref={refs.searchButtonRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleSearch();
            }}
            aria-label={isSearchOpen ? 'Close search' : 'Open search'}
            aria-expanded={isSearchOpen}
            aria-controls="mobile-search"
            className="ml-auto flex size-12 items-center justify-center rounded-lg text-white lg:hidden"
          >
            <Search
              size={26}
              className="cursor-pointer text-[#AAAAAA] transition-all duration-300 hover:text-white"
            />
          </button>
        </MobileControls>

        {/* Desktop View */}
        <nav aria-label="Main" className="hidden lg:block">
          <NavLinks className="flex" />
        </nav>

        <div className="hidden flex-1 items-center justify-end gap-5 lg:flex">
          <SearchBox />
        </div>
      </div>

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
