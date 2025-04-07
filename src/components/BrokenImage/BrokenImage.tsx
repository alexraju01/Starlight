interface Props {
	className?: string;
}

export default function BrokenImage({ className = "" }: Props) {
	return (
		<div
			className={`w-full h-full rounded-full flex justify-center items-center bg-[#123] text-white text-center ${className}`}>
			<p>Image not available</p>
		</div>
	);
}
