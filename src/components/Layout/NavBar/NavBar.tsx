'use client';

import clsx from 'clsx';
import { Menu, Search } from 'lucide-react';
import { useEffect, useRef } from 'react';

import SearchBox from '@/components/ui/SearchBox/SearchBox';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useTrackInAppNavigation } from '@/hooks/useInAppHistory';
import { useNavBarLogic } from '@/hooks/useNavBarLogic';

import Logo from './Logo';
import MobileOverlays from './MobileOverlays';
import NavLinks from './NavLinks';

const iconButton =
  'flex size-[40px] items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white';

export default function NavBar() {
  const {
    isMobileNavOpen,
    isSearchOpen,
    isScrolled,
    toggleMobileNav,
    toggleSearch,
    closeMobileNav,
    dismissMobileNav,
    refs,
  } = useNavBarLogic();
  useTrackInAppNavigation();
  useFocusTrap(refs.mobileNavRef, isMobileNavOpen);
  const barRef = useRef<HTMLDivElement>(null);

  // Publishes the bar's height (not the overlays') as --nav-h for page offsets and full-height heroes.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const observer = new ResizeObserver(() => {
      document.documentElement.style.setProperty('--nav-h', `${bar.offsetHeight}px`);
    });
    observer.observe(bar);
    return () => observer.disconnect();
  }, []);

  return (
    // No backdrop-filter on <header>: it would become the fixed drawer's containing block.
    <header className="fixed top-0 left-0 z-50 w-full">
      <div
        ref={barRef}
        className={clsx(
          'page-gutter flex h-[64px] items-center gap-[8px] border-b transition-[background-color,border-color] duration-300 lg:h-[72px] lg:gap-[32px]',
          isScrolled || isSearchOpen
            ? 'bg-secondary/80 border-white/[0.06] backdrop-blur-xl'
            : 'bg-secondary border-transparent',
        )}
      >
        <button
          ref={refs.mobileMenuButtonRef}
          type="button"
          onClick={toggleMobileNav}
          aria-label="Open menu"
          aria-expanded={isMobileNavOpen}
          aria-controls="mobile-nav"
          className={clsx(iconButton, '-ml-[8px] lg:hidden')}
        >
          <Menu aria-hidden="true" className="size-[22px]" />
        </button>

        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <NavLinks variant="bar" />
        </nav>

        <div className="ml-auto hidden lg:block">
          <SearchBox shortcut />
        </div>

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
          className={clsx(iconButton, '-mr-[8px] ml-auto lg:hidden', isSearchOpen && 'bg-white/10')}
        >
          <Search aria-hidden="true" className="size-[22px]" />
        </button>
      </div>

      <MobileOverlays
        isSearchOpen={isSearchOpen}
        isMobileNavOpen={isMobileNavOpen}
        closeMobileNav={closeMobileNav}
        dismissMobileNav={dismissMobileNav}
        searchWrapperRef={refs.searchWrapperRef}
        mobileNavRef={refs.mobileNavRef}
        closeButtonRef={refs.drawerCloseButtonRef}
      />
    </header>
  );
}
