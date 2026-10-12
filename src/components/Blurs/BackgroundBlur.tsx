const BlurBackground = () => {
  return (
    <>
      <div className="md:bg-primary/44 absolute top-[334px] left-[-334px] z-0 size-[400px] blur-[225px]" />
      <div className="md:bg-primary/44 absolute top-1/2 right-[-334px] z-0 size-[400px] blur-[255px]" />
    </>
  );
};

export default BlurBackground;
