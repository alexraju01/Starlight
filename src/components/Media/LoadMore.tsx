import { Loader } from 'lucide-react';

import Button from '@/components/ui/Button/Button';

interface Props {
  hasMore: boolean;
  isLoading: boolean;
  hasError: boolean;
  onLoadMore: () => void;
}

/** Error message + "Load More" button shown under a paginated grid. */
export default function LoadMore({ hasMore, isLoading, hasError, onLoadMore }: Props) {
  return (
    <>
      {hasError && (
        <p role="alert" className="mb-4 text-center text-[14px] text-red-300">
          Couldn’t load more titles. Please try again.
        </p>
      )}

      {hasMore && (
        <div className="flex justify-center">
          <Button
            icon={isLoading && <Loader className="animate-spin" />}
            onClick={onLoadMore}
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? 'Loading…' : 'Load More'}
          </Button>
        </div>
      )}
    </>
  );
}
