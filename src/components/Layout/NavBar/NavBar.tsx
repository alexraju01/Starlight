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
    <header className="fixed top-0 left-0 w-full z-50 bg-[#100F10]">
      <nav className="flex relative flex-col md:flex-row gap-4 md:gap-10 justify-between items-start md:items-center w-full px-6 lg:px-10 py-4">
        <MobileControls>
          {/* 1. Mobile Menu Toggle */}
          <Button
            size="default"
            ref={refs.mobileMenuButtonRef}
            onClick={toggleMobileNav}
            className="lg:hidden text-white py-7 px-5 cursor-pointer"
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
            className="lg:hidden text-white ml-auto"
          >
            <Search
              size={26}
              className="cursor-pointer text-[#AAAAAA] hover:text-white transition-all duration-300 "
            />
          </button>
        </MobileControls>

        {/* Desktop View */}
        {/* Desktop View */}
        <NavLinks className="hidden lg:flex" />
        {/* <div className="hidden lg:flex items-center gap-6 xl:gap-10">
          <NavLinks />
        </div> */}

        <div className="hidden lg:flex items-center gap-5 flex-1 justify-end">
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
