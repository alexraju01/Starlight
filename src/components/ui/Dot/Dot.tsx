interface Props {
	className?: string;
}

export default function Dot({ className = "" }: Props) {
	return <span className={`bg-[#777] w-2 h-2 rounded-full ${className}`}></span>;
}
