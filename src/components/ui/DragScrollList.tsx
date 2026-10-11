'use client';

import clsx from 'clsx';
import { useRef, useState } from 'react';

interface Props {
  className?: string;
  children: React.ReactNode;
}

/** Pixels the pointer must move before a press counts as a drag rather than a click. */
const DRAG_THRESHOLD_PX = 5;

/**
 * Horizontally scrollable list that can also be scrolled by click-and-drag with a mouse.
 * Touch keeps the browser's native swipe; a drag never triggers the link it started on.
 */
export default function DragScrollList({ className, children }: Props) {
  const listRef = useRef<HTMLUListElement>(null);
  const drag = useRef<{ startX: number; startScroll: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    suppressClick.current = false;
    drag.current = { startX: e.clientX, startScroll: e.currentTarget.scrollLeft, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    const state = drag.current;
    if (!state) return;
    const dx = e.clientX - state.startX;

    if (!state.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD_PX) return;
      state.moved = true;
      setIsDragging(true);
      // Keep tracking if the cursor leaves the row mid-drag.
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    e.currentTarget.scrollLeft = state.startScroll - dx;
  };

  const endDrag = () => {
    if (drag.current?.moved) suppressClick.current = true;
    drag.current = null;
    setIsDragging(false);
  };

  // The click that ends a drag would otherwise open whichever chip the mouse was released on.
  const onClickCapture = (e: React.MouseEvent) => {
    if (!suppressClick.current) return;
    suppressClick.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <ul
      ref={listRef}
      className={clsx(className, 'cursor-grab', isDragging && 'cursor-grabbing select-none')}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={onClickCapture}
      // Links are natively draggable; that would hijack the mouse drag.
      onDragStart={(e) => e.preventDefault()}
    >
      {children}
    </ul>
  );
}
