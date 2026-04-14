interface Props {
  className?: string;
}

export default function Spinner({ className }: Props) {
  return (
    <div className={`fixed inset-0 z-[400] flex items-center justify-center bg-black ${className}`}>
      <div className="h-24 w-24 animate-spin rounded-full border-[0.5rem] border-solid border-white border-t-transparent border-b-gray-500" />
    </div>
  );
}
