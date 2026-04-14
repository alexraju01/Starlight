interface Props {
  className?: string;
}

export default function Dot({ className = '' }: Props) {
  return <span className={`h-2 w-2 rounded-full bg-[#777] ${className}`}></span>;
}
