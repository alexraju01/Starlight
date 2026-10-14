import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Muted count shown after the title, e.g. the number of seasons. */
  count?: number;
  id?: string;
}

/** Section title with the red accent bar used across the details page. */
export default function SectionHeading({ children, count, id }: Props) {
  return (
    <div className="flex items-center gap-[12px]">
      <span aria-hidden="true" className="bg-primary h-[22px] w-[4px] shrink-0 rounded-full" />
      <h2
        id={id}
        className="text-[20px] leading-[1.3] font-semibold tracking-[-0.01em] text-white lg:text-[24px]"
      >
        {children}
        {count !== undefined && <span className="ml-[8px] font-normal text-white/40">{count}</span>}
      </h2>
    </div>
  );
}
