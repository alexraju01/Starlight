import Footer from './Footer/Footer';
import NavBar from './NavBar/NavBar';

/**
 * Navbar + main + footer. Used by the (root) layout and by the root not-found page, which
 * Next.js renders outside the (root) layout.
 */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main
        id="main-content"
        tabIndex={-1}
        className="bg-secondary mt-[var(--nav-h)] w-full flex-1 overflow-x-clip focus:outline-none"
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
