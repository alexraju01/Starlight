export default function GenreSkeleton({ count = 27 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="relative flex h-40 flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-white/5 bg-[#111] p-6 text-center"
        >
          {/* Icon placeholder */}
          <div className="relative z-10 h-12 w-12 animate-pulse rounded-full bg-slate-700" />

          {/* Title placeholder */}
          <div className="relative z-10 space-y-2">
            <div className="h-4 w-24 animate-pulse rounded bg-slate-700" />
            <div className="h-2 w-16 animate-pulse rounded bg-slate-600" />
          </div>

          {/* Bottom hover bar placeholder */}
          <div className="absolute bottom-0 left-0 h-[2px] w-full animate-pulse bg-slate-700/50" />
        </div>
      ))}
    </div>
  );
}
