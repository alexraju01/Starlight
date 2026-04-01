// MobileControls.tsx
interface MobileControlsProps {
  children: React.ReactNode;
}

const MobileControls = ({ children }: MobileControlsProps) => {
  return (
    <div className="flex items-center w-full lg:w-auto">
      {/* This wrapper handles the "Logo + Left Button" grouping.
         The last child (the search button) will be pushed to the right 
         by the 'ml-auto' logic if applied to the button itself.
      */}
      <div className="flex items-center gap-5 w-full">{children}</div>
    </div>
  );
};

export default MobileControls;
