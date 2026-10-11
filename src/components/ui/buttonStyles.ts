/** Shared button looks (apply to <button> or <Link>). */
const base =
  'inline-flex h-[48px] items-center justify-center gap-[8px] rounded-[10px] px-[24px] text-[15px] font-semibold transition-colors';

export const primaryButton = `${base} bg-primary text-white hover:bg-[#b8281f]`;

export const ghostButton = `${base} border border-white/20 bg-white/[0.06] text-white hover:bg-white/15`;
