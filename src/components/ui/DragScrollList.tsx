'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { prefersReducedMotion } from '@/utils/motion';
import { nearestSnapPoint } from '@/utils/scrollSnap';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  ref?: React.Ref<HTMLUListElement>;
  'aria-label'?: string;
  children: React.ReactNode;
}

/** Movement (px) before a press counts as a drag rather than a click. */
const DRAG_THRESHOLD_PX = 5;
/** Only motion this recent (ms) counts towards the release speed. */
const VELOCITY_WINDOW_MS = 80;
/** Held still this long (ms) before letting go = no fling. */
const STILL_MS = 120;
/** Coasting distance = release speed (px/ms) × this. */
const MOMENTUM_MS = 320;
const MIN_GLIDE_MS = 240;
const MAX_GLIDE_MS = 900;
const SETTLE_MS = 320;

interface DragState {
  startX: number;
  startScroll: number;
  moved: boolean;
  /** The list snaps when left alone (suspended while we drive it). */
  snaps: boolean;
  /**
   * Scroll position at each drawn frame. Release speed comes from what was on screen, not
   * from pointer events, which arrive bunched up and under-report it.
   */
  frames: { t: number; left: number }[];
}

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/**
 * Horizontal list that a mouse can also drag. On release it glides on at exactly the release
 * speed and eases to rest (on an item edge if the list snaps). Touch keeps native scrolling.
 */
export default function DragScrollList({ className, style, ref, children, ...rest }: Props) {
  const drag = useRef<DragState | null>(null);
  const suppressClick = useRef(false);
  const frame = useRef(0);
  const gliding = useRef<{ list: HTMLElement; snaps: boolean } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Set directly: a state update lands a frame late, and snapping would tug the row meanwhile.
  const setSnapping = (list: HTMLElement, on: boolean) => {
    list.style.scrollSnapType = on ? '' : 'none';
  };

  const stopGlide = () => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    if (gliding.current?.snaps) setSnapping(gliding.current.list, true);
    gliding.current = null;
  };

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
    if (Math.abs(distance) < 1 || prefersReducedMotion()) {
      list.scrollLeft = target;
      return done();
    }

    // easeOutCubic starts at 3× its average speed, so this duration starts at the release speed.
    const onwards = Math.sign(distance) === Math.sign(speed) && Math.abs(speed) > 0.05;
    const duration = onwards
      ? Math.min(Math.max((3 * Math.abs(distance)) / Math.abs(speed), MIN_GLIDE_MS), MAX_GLIDE_MS)
      : SETTLE_MS;

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
    stopGlide();

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
      e.currentTarget.setPointerCapture(e.pointerId);

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
      if (state.snaps) setSnapping(list, true);
      return;
    }

    suppressClick.current = true;
    setIsDragging(false);

    // Speed over the last frames, faded out if the row was held still before release.
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

  // The click ending a drag would otherwise open the item under the pointer.
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
        // Items ignore the pointer mid-drag so hover effects don't flicker.
        isDragging && 'cursor-grabbing select-none [&>*]:pointer-events-none',
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onWheel={stopGlide}
      onTouchStart={stopGlide}
      onClickCapture={onClickCapture}
      // Links are natively draggable, which would hijack the mouse drag.
      onDragStart={(e) => e.preventDefault()}
    >
      {children}
    </ul>
  );
}
