'use client';

import clsx from 'clsx';
import { BookmarkCheck, BookmarkPlus } from 'lucide-react';

import { buttonClass } from '@/components/ui/buttonStyles';
import { useIsSaved } from '@/hooks/useLibrary';
import { MediaWithDetails } from '@/types/global';
import { myList, toSavedTitle } from '@/utils/library';
import { displayName } from '@/utils/media';

interface Props {
  media: MediaWithDetails;
  /** `icon`: round button over a card's artwork. `full`: labelled button on title pages. */
  variant: 'icon' | 'full';
  className?: string;
}

/** Adds a title to My List, or removes it. Saved in this browser only. */
export default function SaveButton({ media, variant, className }: Props) {
  const isSaved = useIsSaved(media);
  const name = displayName(media);
  const Icon = isSaved ? BookmarkCheck : BookmarkPlus;

  const toggle = (e: React.MouseEvent) => {
    // Cards: the button sits on the artwork link and inside the hover-preview area.
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) myList.remove(media);
    else myList.add(toSavedTitle(media));
  };

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-pressed={isSaved}
        aria-label={isSaved ? `Remove ${name} from My List` : `Add ${name} to My List`}
        title={isSaved ? 'In My List' : 'Add to My List'}
        className={clsx(
          'flex size-[36px] items-center justify-center rounded-full border backdrop-blur-md transition-[opacity,background-color,border-color]',
          isSaved
            ? 'text-secondary border-white bg-white'
            : 'border-white/30 bg-black/60 text-white hover:bg-black/80',
          // Shown on hover/focus with a mouse, always on touch screens, and while saved.
          !isSaved &&
            'opacity-0 group-hover:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100',
          className,
        )}
      >
        <Icon aria-hidden="true" className="size-[18px]" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isSaved}
      className={buttonClass('ghost', 'lg', clsx('backdrop-blur-md', className))}
    >
      <Icon aria-hidden="true" className="size-[18px]" />
      {isSaved ? 'In My List' : 'My List'}
    </button>
  );
}
