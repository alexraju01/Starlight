interface Props {
	className?: string;
}

export default function Spinner({ className }: Props) {
	return (
		<div className={`fixed inset-0 z-[400] flex justify-center items-center bg-black ${className}`}>
			<div className='w-24 h-24 border-[0.5rem] border-solid border-white border-t-transparent border-b-gray-500 rounded-full animate-spin' />
		</div>
	);
}
