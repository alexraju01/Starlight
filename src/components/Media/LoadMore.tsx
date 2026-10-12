import { ChevronDown, Loader2 } from 'lucide-react';

import { buttonClass } from '@/components/ui/buttonStyles';

interface Props {
  hasMore: boolean;
  isLoading: boolean;
  hasError: boolean;
  onLoadMore: () => void;
}

/** Error message + "Load More" button shown under a paginated grid. */
export default function LoadMore({ hasMore, isLoading, hasError, onLoadMore }: Props) {
  if (!hasMore && !hasError) return null;

  return (
    <div className="mt-[16px] flex flex-col items-center gap-[12px] lg:mt-[24px]">
      {hasError && (
        <p role="alert" className="text-[14px] text-red-300">
          Couldn’t load more titles. Please try again.
        </p>
      )}

      {hasMore && (
        <button
          type="button"
          onClick={onLoadMore}
          disabled={isLoading}
          aria-busy={isLoading}
          className={buttonClass(
            'ghost',
            null,
            'h-[52px] min-w-[200px] gap-[8px] px-[32px] text-[16px] disabled:cursor-wait disabled:opacity-60',
          )}
        >
          {isLoading ? (
            <Loader2 aria-hidden="true" className="size-[18px] animate-spin" />
          ) : (
            <ChevronDown aria-hidden="true" className="size-[18px]" />
          )}
          {isLoading ? 'Loading…' : 'Load more'}
        </button>
      )}
    </div>
  );
}
