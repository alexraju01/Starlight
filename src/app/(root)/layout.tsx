import { Footer, NavBar } from '@/components';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <main
        id="main-content"
        tabIndex={-1}
        className="bg-secondary mt-20 w-full flex-1 overflow-x-clip focus:outline-none lg:mt-[70px] xl:mt-[87px]"
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

export default layout;
