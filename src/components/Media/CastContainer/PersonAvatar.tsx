import clsx from 'clsx';
import Image from 'next/image';

import { getImageUrl } from '@/utils/image/getImageUrl';

interface Props {
  name: string;
  profilePath: string | null;
  /** Tailwind size classes for the circle, e.g. "size-[96px] lg:size-[112px]". */
  sizeClass: string;
  /** Image `sizes` hint (px). */
  sizes: string;
  /** Initials text size for the no-photo fallback. */
  initialsClass?: string;
}

/** "Peter Dinklage" → "PD". */
const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

/** A stable, muted colour per name, so a monogram always looks the same for that person. */
const hueOf = (name: string) =>
  [...name].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) % 360, 7);

/** Round portrait with a gradient ring; falls back to a colour-coded monogram. */
export default function PersonAvatar({
  name,
  profilePath,
  sizeClass,
  sizes,
  initialsClass = 'text-[28px]',
}: Props) {
  const photo = getImageUrl(profilePath, 'profile', 'w185');
  const hue = hueOf(name);

  return (
    // Gradient ring → dark gap → photo. (A CSS `ring` for the gap would be drawn on top of
    // the gradient and hide it.) Static: portraits aren't links, so no hover state.
    <div className="rounded-full bg-gradient-to-br from-white/30 via-white/[0.08] to-white/20 p-[2px]">
      <div className="bg-secondary rounded-full p-[3px]">
        <div className={clsx('relative overflow-hidden rounded-full', sizeClass)}>
          {photo ? (
            <Image
              src={photo}
              alt={name}
              fill
              sizes={sizes}
              className="object-cover object-[center_20%]"
            />
          ) : (
            <div
              role="img"
              aria-label={name}
              className={clsx(
                'flex size-full items-center justify-center font-semibold tracking-[0.02em] text-white/85',
                initialsClass,
              )}
              style={{
                background: `linear-gradient(135deg, hsl(${hue} 38% 34%), hsl(${(hue + 40) % 360} 30% 18%))`,
              }}
            >
              {initialsOf(name)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
