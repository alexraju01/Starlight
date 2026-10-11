interface Props {
  className?: string;
}

/** In-content loader – keeps the navbar visible instead of blacking out the whole screen. */
export default function Spinner({ className = '' }: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex min-h-[60vh] w-full items-center justify-center ${className}`}
    >
      <div className="h-24 w-24 animate-spin rounded-full border-[0.5rem] border-solid border-white border-t-transparent border-b-gray-500" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
