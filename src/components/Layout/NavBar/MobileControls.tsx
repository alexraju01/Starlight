interface MobileControlsProps {
  children: React.ReactNode;
}

const MobileControls = ({ children }: MobileControlsProps) => {
  return (
    <div className="flex w-full items-center lg:w-auto">
      <div className="flex w-full items-center gap-5">{children}</div>
    </div>
  );
};

export default MobileControls;
