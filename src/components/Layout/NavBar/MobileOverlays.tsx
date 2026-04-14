import SearchBox from '@/components/ui/SearchBox/SearchBox';

import NavLinks from './NavLinks';

interface MobileOverlaysProps {
  isSearchOpen: boolean;
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (open: boolean) => void;
  searchWrapperRef: React.RefObject<HTMLDivElement | null>;
  mobileNavRef: React.RefObject<HTMLDivElement | null>;
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
      ref={searchWrapperRef}
      className={`relative bg-[#0E0E0E] transition-all duration-300 ease-in-out lg:hidden ${
        isSearchOpen ? 'max-h-[100vh] opacity-100' : 'max-h-0 overflow-hidden opacity-0'
      }`}
    >
      <div className="px-6 py-4">
        <SearchBox />
      </div>
    </div>

    {/* 📱 Nav Menu */}
    <div
      ref={mobileNavRef}
      className={`relative transition-all duration-300 ease-in-out lg:hidden ${
        isMobileNavOpen ? 'max-h-screen opacity-100' : 'max-h-0 overflow-hidden opacity-0'
      }`}
    >
      <div className="absolute w-full bg-[#100F10] p-6 shadow-xl">
        <NavLinks className="flex flex-col gap-4" onLinkClick={() => setIsMobileNavOpen(false)} />
      </div>
    </div>
  </>
);

export default MobileOverlays;
