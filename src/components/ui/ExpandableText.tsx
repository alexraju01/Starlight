'use client';

import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';

interface Props {
  text: string;
  /** Visible lines while collapsed. */
  lines?: number;
  /** The text's line height (unitless), so `lines` lands on whole lines. */
  lineHeight?: number;
  /** Collapse on phones and tablets only; from `lg` the full text always shows. */
  mobileOnly?: boolean;
  className?: string;
}

/**
 * Long text (any number of paragraphs) collapsed to a few lines with a soft fade, and
 * "Read more" only when it actually overflows. Clamped by height: `line-clamp` can't
 * span several paragraphs.
 */
export default function ExpandableText({
  text,
  lines = 5,
  lineHeight = 1.75,
  mobileOnly = false,
  className,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setOverflows(el.scrollHeight > el.clientHeight + 1);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [text]);

  const isClamped = !isExpanded && overflows;

  return (
    <div className={className}>
      <div
        ref={ref}
        id={id}
        style={{ '--clamp-h': `${lines * lineHeight}em` } as React.CSSProperties}
        className={clsx(
          'flex flex-col gap-[12px] overflow-hidden',
          !isExpanded && 'max-h-(--clamp-h)',
          mobileOnly && 'lg:max-h-none',
          isClamped &&
            (mobileOnly
              ? 'max-lg:[mask-image:linear-gradient(to_bottom,#000_55%,transparent)]'
              : '[mask-image:linear-gradient(to_bottom,#000_55%,transparent)]'),
        )}
      >
        {text.split(/\n+/).map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      {(overflows || isExpanded) && (
        <button
          type="button"
          onClick={() => setIsExpanded((v) => !v)}
          aria-expanded={isExpanded}
          aria-controls={id}
          className={clsx(
            'mt-[10px] inline-flex min-h-[24px] items-center gap-[4px] text-[14px] font-semibold text-white transition-colors hover:text-white/75',
            mobileOnly && 'lg:hidden',
          )}
        >
          {isExpanded ? 'Show less' : 'Read more'}
          <ChevronDown
            aria-hidden="true"
            className={clsx('size-[16px] transition-transform', isExpanded && 'rotate-180')}
          />
        </button>
      )}
    </div>
  );
}
