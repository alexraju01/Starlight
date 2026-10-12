import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { useScrollLock } from './useScrollLock';

export const useNavBarLogic = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  const searchWrapperRef = useRef<HTMLDivElement | null>(null);
  const searchButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileNavRef = useRef<HTMLElement | null>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null);
  const drawerCloseButtonRef = useRef<HTMLButtonElement | null>(null);

  // Switches the bar to its translucent style.
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const update = () => setIsScrolled(window.scrollY > 8);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const toggleMobileNav = () => {
    setIsMobileNavOpen((prev) => !prev);
    setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    setIsMobileNavOpen(false);
  };

  /** Closes the drawer from inside it and hands focus back to the menu button. */
  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
    mobileMenuButtonRef.current?.focus();
  };

  // While the drawer is open: the page can't scroll, focus starts on "Close", and widening
  // the window to the desktop layout closes it.
  useScrollLock(isMobileNavOpen);
  useEffect(() => {
    if (!isMobileNavOpen) return;
    drawerCloseButtonRef.current?.focus();

    const desktop = window.matchMedia('(min-width: 1024px)');
    const onChange = (e: MediaQueryListEvent) => e.matches && setIsMobileNavOpen(false);
    desktop.addEventListener('change', onChange);
    return () => desktop.removeEventListener('change', onChange);
  }, [isMobileNavOpen]);

  const closeAll = () => {
    setIsMobileNavOpen(false);
    setIsSearchOpen(false);
  };

  // Close overlays after navigating (state adjusted during render, as React recommends).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsMobileNavOpen(false);
    setIsSearchOpen(false);
  }

  useEffect(() => {
    if (!isSearchOpen && !isMobileNavOpen) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        isSearchOpen &&
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(target) &&
        searchButtonRef.current &&
        !searchButtonRef.current.contains(target)
      ) {
        setIsSearchOpen(false);
      }
      if (
        isMobileNavOpen &&
        mobileNavRef.current &&
        !mobileNavRef.current.contains(target) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(target)
      ) {
        setIsMobileNavOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      // Return focus to the control that opened the overlay.
      if (isMobileNavOpen) mobileMenuButtonRef.current?.focus();
      else if (isSearchOpen) searchButtonRef.current?.focus();
      closeAll();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchOpen, isMobileNavOpen]);

  return {
    isMobileNavOpen,
    isSearchOpen,
    isScrolled,
    toggleMobileNav,
    toggleSearch,
    closeMobileNav,
    /** For links inside the drawer: close without moving focus (the page is changing). */
    dismissMobileNav: () => setIsMobileNavOpen(false),
    refs: {
      drawerCloseButtonRef,
      searchWrapperRef,
      searchButtonRef,
      mobileNavRef,
      mobileMenuButtonRef,
    },
  };
};
