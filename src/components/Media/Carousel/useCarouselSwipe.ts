import { useRef, useState } from 'react';

const SWIPE_THRESHOLD_PX = 50;

interface Options {
  enabled: boolean;
  /** Width of one slide, used to turn pixels dragged into slides moved. */
  getWidth: () => number;
  /** Places the slides for a fractional position while the pointer moves. */
  onDrag: (slidesMoved: number) => void;
  /** Called on release: -1 = previous, 1 = next, 0 = snap back. */
  onRelease: (direction: -1 | 0 | 1) => void;
}

/**
 * Swipe (touch) and click-and-drag (mouse) via pointer events. Locks to an axis on the first
 * real movement so vertical page scrolling still works.
 */
export function useCarouselSwipe({ enabled, getWidth, onDrag, onRelease }: Options) {
  const [isDragging, setIsDragging] = useState(false);
  const drag = useRef<{ x: number; y: number; axis: 'x' | 'y' | null } | null>(null);
  const didDrag = useRef(false);

  const onPointerDown = (e: React.PointerEvent) => {
    didDrag.current = false;
    if (!enabled) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    drag.current = { x: e.clientX, y: e.clientY, axis: null };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const state = drag.current;
    if (!state) return;
    const dx = e.clientX - state.x;
    const dy = e.clientY - state.y;

    if (!state.axis) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      state.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (state.axis === 'x') {
        setIsDragging(true);
        // Keep receiving moves even if the mouse leaves the carousel mid-drag.
        e.currentTarget.setPointerCapture(e.pointerId);
      }
    }
    if (state.axis !== 'x') return;

    // The slides follow the pointer 1:1.
    onDrag(dx / (getWidth() || 1));
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const state = drag.current;
    drag.current = null;
    if (!state || state.axis !== 'x') return;

    setIsDragging(false);
    didDrag.current = true;
    const delta = e.clientX - state.x;

    if (e.type === 'pointercancel' || Math.abs(delta) < SWIPE_THRESHOLD_PX) onRelease(0);
    else onRelease(delta < 0 ? 1 : -1);
  };

  // A mouse drag still fires `click` on release – don't let it trigger the
  // trailer button / links underneath the pointer.
  const onClickCapture = (e: React.MouseEvent) => {
    if (!didDrag.current) return;
    didDrag.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

  return {
    isDragging,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
      onClickCapture,
      // Stop the browser's native image drag from hijacking a mouse swipe.
      onDragStart: (e: React.DragEvent) => e.preventDefault(),
    },
  };
}
