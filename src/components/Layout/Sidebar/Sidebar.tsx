'use client';
import { useEffect, useState } from 'react';
import Icons from '@/utils/icons';
import NavLinks from './NavLinks/NavLinks';
import { links } from '@/constants';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1200px)');
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsOpen(e.matches);
    };

    handleMediaChange(mediaQuery);
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const closeSidebarOnMobile = () => {
    if (window.innerWidth < 1200) {
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed  top-0 left-0 z-15 h-screen bg-[#100f10] text-white border-r border-[#252525] transition-all duration-300 ${
        isOpen ? 'min-w-70 translate-x-0' : 'w-0'
      } xl:sticky xl:w-70`}
      style={{ borderRight: '0.1rem solid #252525' }}
    >
      {/* Logo Section */}
      <div
        className={`flex justify-center items-center pt-12 pb-4 text-3xl font-semibold whitespace-nowrap transition-all duration-300 ${
          isOpen ? 'translate-x-0 w-full' : '-translate-x-80 w-0'
        }`}
      >
        <p>
          <span className="text-primary font-bold">S</span>tar{' '}
          <span className="text-primary font-bold">L</span>ight
        </p>
      </div>

      {/* Sidebar with height minus logo */}
      <div
        className={`flex flex-col justify-between transition-all duration- w-64 transform z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-80 w-0'
        }`}
        style={{ height: 'calc(100vh - 5rem)' }} // 👈 adjust based on logo height
      >
        <ul className="flex flex-col gap-4 pt-4 px-4">
          {links.map((link) => (
            <NavLinks key={link.href} linkData={link} closeSidebar={closeSidebarOnMobile} />
          ))}
        </ul>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
        className="absolute left-full top-0 w-24 h-24 text-3xl bg-[#100f10] rounded-br-full xl:hidden hover:cursor-pointer"
      >
        <span className="absolute top-4 left-4">{Icons.menu}</span>
      </button>
    </nav>
  );
}
