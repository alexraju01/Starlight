interface Props {
  className?: string;
}

export default function BrokenImage({ className = '' }: Props) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-full bg-[#123] text-center text-white ${className}`}
    >
      <p>Image not available</p>
    </div>
  );
}
