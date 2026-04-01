import { useEffect, useRef, useState } from 'react';

export const useNavBarLogic = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Refs for click-outside detection
  const searchWrapperRef = useRef<HTMLDivElement | null>(null);
  const searchButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null);

  const toggleMobileNav = () => {
    setIsMobileNavOpen((prev) => !prev);
    setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    setIsMobileNavOpen(false);
  };

  const closeAll = () => {
    setIsMobileNavOpen(false);
    setIsSearchOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;

      // Search outside click
      if (
        isSearchOpen &&
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(target) &&
        searchButtonRef.current &&
        !searchButtonRef.current.contains(target)
      ) {
        setIsSearchOpen(false);
      }

      // Mobile Nav outside click
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

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isSearchOpen, isMobileNavOpen]);

  return {
    isMobileNavOpen,
    setIsMobileNavOpen,
    isSearchOpen,
    toggleMobileNav,
    toggleSearch,
    closeAll,
    refs: {
      searchWrapperRef,
      searchButtonRef,
      mobileNavRef,
      mobileMenuButtonRef,
    },
  };
};
