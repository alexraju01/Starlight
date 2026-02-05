import { NavBar } from '@/components';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <main className="overflow-auto w-full h-full lg:mt-[70px] xl:mt-[87px]">{children}</main>
      {/* {children} */}
    </>
  );
};

export default layout;
