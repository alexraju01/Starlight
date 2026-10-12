import clsx from 'clsx';
import Image from 'next/image';

interface Props {
  /** Up to three poster URLs: back-left, front, back-right. */
  posters: string[];
  className?: string;
}

/** [x offset px, rotation deg, stacking] for back-left, front, back-right. */
const FAN = [
  [-118, -9, 1],
  [0, 0, 3],
  [118, 9, 2],
] as const;

/**
 * Three posters fanned out like a hand of cards, each sliding up in turn. Give it a new
 * `key` to replay the entrance (the spotlight does, on every genre change).
 */
export default function PosterFan({ posters, className }: Props) {
  return (
    <div aria-hidden="true" className={clsx('pointer-events-none', className)}>
      {posters.slice(0, 3).map((poster, i) => {
        const [x, rotate, z] = FAN[i];
        return (
          <div
            key={poster}
            className="absolute bottom-0 left-1/2 w-[180px]"
            style={{
              zIndex: z,
              transform: `translateX(calc(-50% + ${x}px)) rotate(${rotate}deg)`,
            }}
          >
            <div
              className="relative aspect-[2/3] overflow-hidden rounded-[14px] opacity-0 shadow-[0_24px_48px_rgba(0,0,0,0.6)] ring-1 ring-white/15"
              style={{
                animation: `fan-in 700ms cubic-bezier(0.22,1,0.36,1) ${120 * i}ms forwards`,
              }}
            >
              <Image src={poster} alt="" fill sizes="180px" className="object-cover" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
