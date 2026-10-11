import { ChevronDown, Loader2 } from 'lucide-react';

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
          className="inline-flex h-[52px] min-w-[200px] items-center justify-center gap-[8px] rounded-[10px] border border-white/20 bg-white/[0.06] px-[32px] text-[16px] font-medium text-white transition-colors hover:bg-white/15 disabled:cursor-wait disabled:opacity-60"
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
