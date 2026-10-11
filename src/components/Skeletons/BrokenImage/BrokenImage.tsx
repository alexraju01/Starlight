import { ImageOff } from 'lucide-react';

interface Props {
  className?: string;
}

export default function BrokenImage({ className = '' }: Props) {
  return (
    <div
      role="img"
      aria-label="Image not available"
      className={`flex h-full w-full items-center justify-center bg-[#222] text-center text-white/40 ${className}`}
    >
      <ImageOff aria-hidden="true" className="size-1/3 max-h-10 max-w-10" />
    </div>
  );
}
