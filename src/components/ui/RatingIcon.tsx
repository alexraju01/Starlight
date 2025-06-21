interface Props {
	vote: number;
	className?: string;
}

export default function RatingIcon({ vote, className }: Props) {
	return (
		<div className='flex items-center gap-[0.5rem]'>
			<p
				className={`
					font-bold 
					text-black 
					bg-[#edc017] 
					border 
					border-[#edc017] 
					rounded-[0.5rem] 
					px-[0.2rem]
                    py-[0.1rem]
					text-xl
					${className ?? ""}
				`}>
				TMDB
			</p>
			<p className='text-white font-medium'>{vote?.toFixed(1)}</p>
		</div>
	);
}
