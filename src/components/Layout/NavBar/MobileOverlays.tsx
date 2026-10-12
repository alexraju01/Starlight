import clsx from 'clsx';
import { X } from 'lucide-react';
import Link from 'next/link';

import SearchBox from '@/components/ui/SearchBox/SearchBox';
import { QUICK_GENRES } from '@/constants';
import { ROUTES } from '@/constants/route';

import Logo from './Logo';
import NavLinks from './NavLinks';

interface MobileOverlaysProps {
  isSearchOpen: boolean;
  isMobileNavOpen: boolean;
  closeMobileNav: () => void;
  dismissMobileNav: () => void;
  searchWrapperRef: React.RefObject<HTMLDivElement | null>;
  mobileNavRef: React.RefObject<HTMLElement | null>;
  closeButtonRef: React.RefObject<HTMLButtonElement | null>;
}

/** Below `lg`: the drop-down search panel and the slide-in navigation drawer. */
export default function MobileOverlays({
  isSearchOpen,
  isMobileNavOpen,
  closeMobileNav,
  dismissMobileNav,
  searchWrapperRef,
  mobileNavRef,
  closeButtonRef,
}: MobileOverlaysProps) {
  return (
    <>
      <div
        id="mobile-search"
        ref={searchWrapperRef}
        inert={!isSearchOpen}
        className={clsx(
          'bg-secondary page-gutter border-b border-white/[0.06] transition-[opacity,padding] duration-200 lg:hidden',
          isSearchOpen
            ? 'py-[12px] opacity-100'
            : 'pointer-events-none h-0 overflow-hidden py-0 opacity-0',
        )}
      >
        {/* Remount when opened so the input auto-focuses. */}
        {isSearchOpen && <SearchBox autoFocus />}
      </div>

      {/* Always rendered so it can animate; `inert` while closed. */}
      <div
        inert={!isMobileNavOpen}
        className={clsx(
          'fixed inset-0 z-[60] lg:hidden',
          !isMobileNavOpen && 'pointer-events-none',
        )}
      >
        <div
          aria-hidden="true"
          className={clsx(
            'absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300',
            isMobileNavOpen ? 'opacity-100' : 'opacity-0',
          )}
        />

        <nav
          id="mobile-nav"
          aria-label="Mobile"
          ref={mobileNavRef}
          className={clsx(
            'bg-panel absolute inset-y-0 left-0 flex w-[min(320px,85vw)] flex-col overflow-y-auto overscroll-contain border-r border-white/[0.06] shadow-[16px_0_48px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
            isMobileNavOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <div className="flex h-[64px] shrink-0 items-center justify-between px-[16px]">
            <Logo onClick={dismissMobileNav} />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeMobileNav}
              aria-label="Close menu"
              className="flex size-[40px] items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X aria-hidden="true" className="size-[22px]" />
            </button>
          </div>

          <div className="flex flex-col gap-[24px] px-[12px] pt-[8px] pb-[max(24px,env(safe-area-inset-bottom))]">
            <div className="px-[4px]">{isMobileNavOpen && <SearchBox />}</div>

            <NavLinks variant="drawer" onLinkClick={dismissMobileNav} />

            <div className="border-t border-white/[0.06] px-[4px] pt-[20px]">
              <p className="mb-[12px] text-[12px] font-semibold tracking-[0.08em] text-white/40 uppercase">
                Popular genres
              </p>
              <ul className="flex flex-wrap gap-[8px]">
                {QUICK_GENRES.map((name) => (
                  <li key={name}>
                    <Link
                      href={ROUTES.GENRE(name)}
                      onClick={dismissMobileNav}
                      className="inline-flex h-[34px] items-center rounded-full border border-white/12 bg-white/[0.04] px-[14px] text-[14px] text-white/80 transition-colors hover:border-white/30 hover:text-white"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
