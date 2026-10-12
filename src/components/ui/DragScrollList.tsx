'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { nearestSnapPoint } from '@/utils/scrollSnap';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  /** Lets a parent control scrolling (e.g. arrow buttons). */
  ref?: React.Ref<HTMLUListElement>;
  /** Accessible name for the list. */
  'aria-label'?: string;
  children: React.ReactNode;
}

/** Pixels the pointer must move before a press counts as a drag rather than a click. */
const DRAG_THRESHOLD_PX = 5;
/** Only motion this recent (ms) counts towards the release speed. */
const VELOCITY_WINDOW_MS = 80;
/** Holding still this long (ms) before letting go means "no fling". */
const STILL_MS = 120;
/** How far a release coasts: release speed (px/ms) × this. */
const MOMENTUM_MS = 320;
/** Glide duration bounds (ms). */
const MIN_GLIDE_MS = 240;
const MAX_GLIDE_MS = 900;

interface DragState {
  startX: number;
  startScroll: number;
  moved: boolean;
  /** Whether the list snaps when left alone (snapping is suspended while we drive it). */
  snaps: boolean;
  /**
   * The row's on-screen position at each drawn frame while dragging. Release speed comes
   * from these (what the user actually saw move), not from pointer events, which can
   * arrive bunched up and under-report the speed.
   */
  frames: { t: number; left: number }[];
}

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/**
 * Horizontally scrollable list that can also be dragged with a mouse. On release the row
 * keeps the drag's momentum and decelerates to rest – on an item edge when the list snaps –
 * starting at exactly the release speed, so there's no hitch between dragging and gliding.
 * Touch keeps the browser's native swipe; a drag never triggers the link it started on.
 */
export default function DragScrollList({ className, style, ref, children, ...rest }: Props) {
  const drag = useRef<DragState | null>(null);
  const suppressClick = useRef(false);
  const frame = useRef(0);
  /** The glide in flight: which list, and whether that list snaps when left alone. */
  const gliding = useRef<{ list: HTMLElement; snaps: boolean } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Driving scrollLeft ourselves: snapping must be off right away (a React state update
  // lands a frame late, and the browser would tug the row towards items meanwhile).
  const setSnapping = (list: HTMLElement, on: boolean) => {
    list.style.scrollSnapType = on ? '' : 'none';
  };

  /** Halts an in-flight glide (and gives the list its snapping back). */
  const stopGlide = () => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    if (gliding.current?.snaps) setSnapping(gliding.current.list, true);
    gliding.current = null;
  };

  // Never leave a glide running after unmount.
  useEffect(() => {
    const pending = frame;
    return () => cancelAnimationFrame(pending.current);
  }, []);

  /** Ease from the current position to `target`, starting at `speed` (px/ms). */
  const glideTo = (list: HTMLElement, target: number, speed: number, snaps: boolean) => {
    const start = list.scrollLeft;
    const distance = target - start;
    gliding.current = { list, snaps };
    const done = () => {
      frame.current = 0;
      gliding.current = null;
      if (snaps) setSnapping(list, true);
    };
    if (Math.abs(distance) < 1 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      list.scrollLeft = target;
      return done();
    }

    // easeOutCubic starts at 3 × average speed: pick the duration that matches the release
    // speed when gliding onwards; a short settle when snapping back against it.
    const onwards = Math.sign(distance) === Math.sign(speed) && Math.abs(speed) > 0.05;
    const duration = onwards
      ? Math.min(Math.max((3 * Math.abs(distance)) / Math.abs(speed), MIN_GLIDE_MS), MAX_GLIDE_MS)
      : 320;

    const startedAt = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - startedAt) / duration, 1);
      list.scrollLeft = start + distance * easeOutCubic(t);
      if (t < 1) frame.current = requestAnimationFrame(step);
      else done();
    };
    frame.current = requestAnimationFrame(step);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    const list = e.currentTarget;
    stopGlide(); // grabbing mid-glide catches the row where it is (and restores snapping)

    suppressClick.current = false;
    drag.current = {
      startX: e.clientX,
      startScroll: list.scrollLeft,
      moved: false,
      snaps: getComputedStyle(list).scrollSnapType !== 'none',
      frames: [],
    };
    setSnapping(list, false);
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

      // Record the row's position every frame until this drag ends.
      const list = e.currentTarget;
      const track = (t: number) => {
        if (drag.current !== state) return;
        state.frames.push({ t, left: list.scrollLeft });
        while (state.frames.length > 2 && t - state.frames[0].t > VELOCITY_WINDOW_MS) {
          state.frames.shift();
        }
        requestAnimationFrame(track);
      };
      requestAnimationFrame(track);
    }

    e.currentTarget.scrollLeft = state.startScroll - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLUListElement>) => {
    const state = drag.current;
    drag.current = null;
    if (!state) return;
    const list = e.currentTarget;

    if (!state.moved) {
      // A plain click: put snapping back as it was.
      if (state.snaps) setSnapping(list, true);
      return;
    }

    suppressClick.current = true;
    setIsDragging(false);

    // The row's speed over its last frames on screen, faded out if it was held still before
    // letting go (so a deliberate stop doesn't fling).
    const now = performance.now();
    const frames = [...state.frames, { t: now, left: list.scrollLeft }];
    const first = frames[0];
    const last = frames[frames.length - 1];
    const moveSpeed = last.t > first.t ? (last.left - first.left) / (last.t - first.t) : 0;
    const lastMove = [...frames]
      .reverse()
      .find((f, i, all) => i + 1 < all.length && f.left !== all[i + 1].left);
    const stillFor = lastMove ? now - lastMove.t : Infinity;
    const speed = moveSpeed * Math.max(0, 1 - stillFor / STILL_MS);
    const projected = list.scrollLeft + speed * MOMENTUM_MS;
    const max = list.scrollWidth - list.clientWidth;
    const target = state.snaps
      ? nearestSnapPoint(list, projected)
      : Math.min(Math.max(projected, 0), max);

    glideTo(list, target, speed, state.snaps);
  };

  // The click that ends a drag would otherwise open whichever item the mouse was released on.
  const onClickCapture = (e: React.MouseEvent) => {
    if (!suppressClick.current) return;
    suppressClick.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <ul
      ref={ref}
      style={style}
      aria-label={rest['aria-label']}
      className={clsx(
        className,
        'relative cursor-grab',
        // While dragging, items ignore the pointer so hover effects don't flicker underneath.
        isDragging && 'cursor-grabbing select-none [&>*]:pointer-events-none',
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      // Wheel / touch take over from an in-flight glide.
      onWheel={stopGlide}
      onTouchStart={stopGlide}
      onClickCapture={onClickCapture}
      // Links are natively draggable; that would hijack the mouse drag.
      onDragStart={(e) => e.preventDefault()}
    >
      {children}
    </ul>
  );
}
