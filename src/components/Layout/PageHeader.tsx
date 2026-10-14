interface Props {
  title: React.ReactNode;
  description: React.ReactNode;
  /** Extra content under the text, e.g. the discover search field. */
  children?: React.ReactNode;
}

/** Title + tagline over a soft red glow; the header of the browse, genres and discover pages. */
export default function PageHeader({ title, description, children }: Props) {
  return (
    <header className="page-gutter relative overflow-hidden pt-[32px] lg:pt-[56px]">
      <div
        aria-hidden="true"
        className="from-primary/20 pointer-events-none absolute inset-x-0 -top-[120px] h-[320px] bg-gradient-to-b to-transparent blur-2xl"
      />
      <div className="relative flex flex-col gap-[8px] lg:gap-[12px]">
        <h1 className="text-[clamp(32px,4vw,52px)] leading-[1.05] font-extrabold tracking-[-0.02em] text-white">
          {title}
        </h1>
        <p className="max-w-[56ch] text-[15px] leading-[1.6] text-pretty text-white/60 lg:text-[16px]">
          {description}
        </p>
      </div>
      {children && <div className="relative mt-[24px] lg:mt-[32px]">{children}</div>}
    </header>
  );
}
