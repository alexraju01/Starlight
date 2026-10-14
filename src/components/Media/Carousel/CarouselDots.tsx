import clsx from 'clsx';

interface Props {
  count: number;
  current: number;
  onSelect: (index: number) => void;
}

/**
 * Position indicators: below the image on small screens, overlaid from 840px up. Each bar
 * sits in a 24px-tall button so it's comfortable to tap.
 */
export default function CarouselDots({ count, current, onSelect }: Props) {
  return (
    <div className="mt-[6px] flex justify-center min-[840px]:absolute min-[840px]:bottom-[8px] min-[840px]:left-1/2 min-[840px]:z-[2] min-[840px]:mt-0 min-[840px]:-translate-x-1/2">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to slide ${i + 1} of ${count}`}
          aria-current={i === current ? 'true' : undefined}
          onClick={() => onSelect(i)}
          className="group flex h-[24px] min-w-[24px] items-center justify-center px-[3px]"
        >
          <span
            className={clsx(
              'block h-[4px] rounded-full transition-all duration-300',
              i === current ? 'w-[24px] bg-white' : 'w-[10px] bg-white/40 group-hover:bg-white/70',
            )}
          />
        </button>
      ))}
    </div>
  );
}
