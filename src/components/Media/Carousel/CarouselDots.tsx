import clsx from 'clsx';

interface Props {
  count: number;
  current: number;
  onSelect: (index: number) => void;
}

/** Position indicators: below the image on small screens, overlaid from 840px up. */
export default function CarouselDots({ count, current, onSelect }: Props) {
  return (
    <div className="mt-4 flex justify-center gap-2 min-[840px]:absolute min-[840px]:bottom-4 min-[840px]:left-1/2 min-[840px]:z-2 min-[840px]:mt-0 min-[840px]:-translate-x-1/2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to slide ${i + 1} of ${count}`}
          aria-current={i === current ? 'true' : undefined}
          onClick={() => onSelect(i)}
          className={clsx(
            'h-1.5 rounded-full transition-all duration-300',
            i === current ? 'w-8 bg-white' : 'w-3 bg-white/40 hover:bg-white/70',
          )}
        />
      ))}
    </div>
  );
}
