interface Props {
	children?: React.ReactNode;
	className?: string;
}

export default function LoadingSkeletons({ children, className }: Props) {
	const placeholderCards = Array.from({ length: 20 }).map((_, index) => (
		<div key={index} className='w-full aspect-[2/3] rounded-lg animate-pulse bg-slate-700' />
	));

	return (
		<div className={`w-full mt-16 ${className}`}>
			<h2>{children}</h2>
			<div
				className='
          grid gap-8 p-6 w-full
          [grid-template-columns:repeat(auto-fill,minmax(9rem,1fr))]
          sm:[grid-template-columns:repeat(auto-fill,minmax(12rem,1fr))]
          md:[grid-template-columns:repeat(auto-fill,minmax(14rem,1fr))]
          [@media(min-width:1200px)]:[grid-template-columns:repeat(auto-fill,minmax(16rem,1fr))]
          [@media(min-width:1200px)]:p-16
          [@media(min-width:1536px)]:[grid-template-columns:repeat(auto-fill,minmax(18rem,1fr))]
        '>
				{placeholderCards}
			</div>
		</div>
	);
}
