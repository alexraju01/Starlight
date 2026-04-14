import { JSX, ReactNode } from 'react';

interface Props {
  icon?: JSX.Element;
  children: ReactNode;
}

export default function SectionHeading({ children, icon }: Props) {
  return (
    <div className="my-4 flex items-center text-[1.8rem] font-bold">
      <i className="text-white">{icon}</i>
      <h2 className="ml-3">{children}</h2>
    </div>
  );
}
