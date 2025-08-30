export default function GenreSkeleton() {
  const placeholderCards = Array.from({ length: 35 }).map((_, index) => (
    <div key={index} className="h-48 w-full rounded-lg animate-pulse bg-slate-700" />
  ));

  return (
    <div className="flex flex-col justify-center items-center mt-20 w-full h-full">
      <div
        className="grid gap-6 p-6 w-full
        [grid-template-columns:repeat(auto-fill,minmax(9rem,1fr))]
        sm:[grid-template-columns:repeat(auto-fill,minmax(10rem,1fr))]
        md:[grid-template-columns:repeat(auto-fill,minmax(11rem,1fr))]
        [@media(min-width:1200px)]:[grid-template-columns:repeat(auto-fill,minmax(12rem,1fr))]
        [@media(min-width:1200px)]:p-16"
      >
        {placeholderCards}
      </div>
    </div>
  );
}
