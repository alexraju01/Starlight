import { Footer, NavBar } from '@/components';

const layout = ({ children }: { children: React.ReactNode }) => {
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
};

export default layout;
