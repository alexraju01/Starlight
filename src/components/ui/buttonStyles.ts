import clsx from 'clsx';

type Variant = 'primary' | 'ghost' | 'light';
type Size = 'sm' | 'md' | 'lg';

const SHAPE =
  'inline-flex items-center justify-center rounded-[10px] transition-[background-color,border-color,color,scale]';

const SIZES: Record<Size, string> = {
  sm: 'h-[44px] gap-[8px] px-[20px] text-[15px]',
  md: 'h-[48px] gap-[8px] px-[24px] text-[15px]',
  lg: 'h-[52px] gap-[8px] px-[24px] text-[16px]',
};

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-primary font-semibold text-white hover:bg-primary-hover',
  ghost: 'border border-white/20 bg-white/[0.06] font-medium text-white hover:bg-white/15',
  /** On busy artwork or coloured backgrounds, where red could clash. */
  light: 'bg-white font-semibold text-secondary hover:bg-white/85',
};

/**
 * Shared button look (for <button> or <Link>). Pass `size: null` when the caller sets its
 * own height / padding / gap / text size – there's no class merging, so a size preset and
 * a conflicting override must not be combined.
 */
export const buttonClass = (variant: Variant, size: Size | null = 'md', className?: string) =>
  clsx(SHAPE, size && SIZES[size], VARIANTS[variant], className);

export const primaryButton = buttonClass('primary');
export const ghostButton = buttonClass('ghost');
