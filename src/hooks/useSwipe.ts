import { useEffect, useRef, useState } from 'react';

const SWIPE_THRESHOLD_PX = 50;
/** A release faster than this (px/ms) counts as a flick even if the drag was short. */
const FLICK_VELOCITY = 0.4;
/** Pointer samples older than this (ms) are ignored when measuring release velocity. */
const VELOCITY_WINDOW_MS = 100;

interface Options {
  enabled: boolean;
  /** Called once when a horizontal drag locks in, before the first `onDrag`. */
  onDragStart?: () => void;
  /** Pixels dragged since the drag started (negative = towards the next item). */
  onDrag: (dx: number) => void;
  /** Called on release: -1 = previous, 1 = next, 0 = snap back. */
  onRelease: (direction: -1 | 0 | 1) => void;
}

interface DragState {
  x: number;
  y: number;
  axis: 'x' | 'y' | null;
  /** Recent pointer positions, for the release velocity. */
  samples: { x: number; t: number }[];
}

/**
 * Swipe (touch) and click-and-drag (mouse) via pointer events, used by the hero carousel
 * and the row sliders. Locks to an axis on the first real movement so vertical page
 * scrolling still works (pair it with `touch-action: pan-y`).
 */
export function useSwipe({ enabled, onDragStart, onDrag, onRelease }: Options) {
  const [isDragging, setIsDragging] = useState(false);
  const drag = useRef<DragState | null>(null);
  const didDrag = useRef(false);
  // Pointer moves can arrive several times per frame; only lay out once per frame.
  const frame = useRef(0);
  const pendingDx = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const onPointerDown = (e: React.PointerEvent) => {
    didDrag.current = false;
    if (!enabled) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    drag.current = { x: e.clientX, y: e.clientY, axis: null, samples: [] };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const state = drag.current;
    if (!state) return;

    if (!state.axis) {
      const dx = e.clientX - state.x;
      const dy = e.clientY - state.y;
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      state.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (state.axis !== 'x') return;

      // Measure from here so the dead zone above doesn't make the slide jump.
      state.x = e.clientX;
      setIsDragging(true);
      onDragStart?.();
      // Keep receiving moves even if the mouse leaves the carousel mid-drag.
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    if (state.axis !== 'x') return;

    const now = e.timeStamp;
    state.samples.push({ x: e.clientX, t: now });
    while (state.samples.length > 2 && now - state.samples[0].t > VELOCITY_WINDOW_MS) {
      state.samples.shift();
    }

    // The slides follow the pointer 1:1.
    pendingDx.current = e.clientX - state.x;
    if (!frame.current) {
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        onDrag(pendingDx.current);
      });
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const state = drag.current;
    drag.current = null;
    if (!state || state.axis !== 'x') return;

    cancelAnimationFrame(frame.current);
    frame.current = 0;
    setIsDragging(false);
    didDrag.current = true;

    if (e.type === 'pointercancel') return onRelease(0);

    const delta = e.clientX - state.x;
    const first = state.samples[0];
    const velocity =
      first && e.timeStamp - first.t > 0 ? (e.clientX - first.x) / (e.timeStamp - first.t) : 0;
    const isFlick = Math.abs(velocity) > FLICK_VELOCITY && Math.sign(velocity) === Math.sign(delta);

    if (Math.abs(delta) < SWIPE_THRESHOLD_PX && !isFlick) onRelease(0);
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
