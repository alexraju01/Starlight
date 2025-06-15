import React from "react";

const SkeletonCard = () => (
	<div className='rounded-lg bg-[#1f1f1f] w-full aspect-[2/3] animate-pulse' />
);

export default function CustomSliderSkeleton() {
	return (
		<div className='flex flex-col w-full py-6 mb-10 text-white gap-[18px]'>
			{/* Title and nav buttons */}
			<div className='flex justify-between items-center'>
				<div className='block bg-gray-700 rounded w-[200px] h-[1.6em] animate-pulse' />
				<div className='flex gap-2.5 px-4 py-2'>
					<div className='h-9 w-9 bg-[#2a2a2a] rounded-full animate-pulse' />
					<div className='h-9 w-9 bg-[#2a2a2a] rounded-full animate-pulse' />
				</div>
			</div>

			{/* Slider Track with padding and scroll safety */}
			<div className='relative w-full px-3 sm:px-6'>
				<div className='flex gap-[16px] overflow-x-hidden'>
					{Array.from({ length: 7 }).map((_, idx) => (
						<div
							key={idx}
							className={`
								flex-shrink-0
								w-[calc(50%-8px)]
								sm:w-[calc(33.333%-10.67px)]
								md:w-[calc(25%-12px)]
								lg:w-[calc(25%-12px)]
								xl:w-[calc(20%-12.8px)]
								2xl:w-[calc(16.666%-13.33px)]
							`}>
							<SkeletonCard />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
