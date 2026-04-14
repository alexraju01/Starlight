import { Footer, NavBar } from '@/components';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <main className="bg-secondary mt-20 h-full w-full overflow-auto lg:mt-[70px] xl:mt-[87px]">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default layout;
