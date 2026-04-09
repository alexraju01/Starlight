interface MobileControlsProps {
  children: React.ReactNode;
}

const MobileControls = ({ children }: MobileControlsProps) => {
  return (
    <div className="flex items-center w-full lg:w-auto">
      <div className="flex items-center gap-5 w-full">{children}</div>
    </div>
  );
};

export default MobileControls;
