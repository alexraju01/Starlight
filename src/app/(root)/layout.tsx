import { Footer, NavBar } from '@/components';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <main className="overflow-auto w-full h-full mt-20 lg:mt-[70px] xl:mt-[87px]">
        {children}
        <Footer />
      </main>
    </>
  );
};

export default layout;
