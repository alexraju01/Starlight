import SearchBox from '@/components/ui/SearchBox/SearchBox';

import NavLinks from './NavLinks';

interface MobileOverlaysProps {
  isSearchOpen: boolean;
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (open: boolean) => void;
  searchWrapperRef: React.RefObject<HTMLDivElement | null>;
  mobileNavRef: React.RefObject<HTMLElement | null>;
}

const MobileOverlays = ({
  isSearchOpen,
  isMobileNavOpen,
  setIsMobileNavOpen,
  searchWrapperRef,
  mobileNavRef,
}: MobileOverlaysProps) => (
  <>
    {/* 📱 Search Dropdown */}
    <div
      id="mobile-search"
      ref={searchWrapperRef}
      // `inert` keeps the collapsed panel out of the tab order and screen readers.
      inert={!isSearchOpen}
      className={`relative bg-[#0E0E0E] transition-all duration-300 ease-in-out lg:hidden ${
        isSearchOpen ? 'max-h-[100vh] opacity-100' : 'max-h-0 overflow-hidden opacity-0'
      }`}
    >
      <div className="px-6 py-4">
        {/* Remount when opened so the input auto-focuses. */}
        {isSearchOpen && <SearchBox autoFocus />}
      </div>
    </div>

    {/* 📱 Nav Menu */}
    <nav
      id="mobile-nav"
      aria-label="Mobile"
      ref={mobileNavRef}
      inert={!isMobileNavOpen}
      className={`relative transition-all duration-300 ease-in-out lg:hidden ${
        isMobileNavOpen ? 'max-h-screen opacity-100' : 'max-h-0 overflow-hidden opacity-0'
      }`}
    >
      <div className="absolute w-full bg-[#100F10] p-6 shadow-xl">
        <NavLinks className="flex flex-col gap-4" onLinkClick={() => setIsMobileNavOpen(false)} />
      </div>
    </nav>
  </>
);

export default MobileOverlays;
