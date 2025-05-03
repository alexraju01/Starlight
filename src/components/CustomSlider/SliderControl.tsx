interface Props {
	onPrev: () => void;
	onNext: () => void;
}

const SliderControl = ({ onPrev, onNext }: Props) => {
	return (
		<div className='flex justify-between gap-2.5   z-30 '>
			<button
				className='bg-[#1A1A1A] flex items-center justify-center size-[33px] lg:size-[42.36px] 2xl:size-[64px] border-2 rounded-[9px]  hover:cursor-pointer'
				onClick={onPrev}>
				{/* Left Arrow */}
				<svg
					width='23'
					height='22'
					viewBox='0 0 23 22'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M21.7488 10.9999L1.69043 10.9999M1.69043 10.9999L10.7167 20.0262M1.69043 10.9999L10.7167 1.97363'
						stroke='white'
						strokeWidth='2.29239'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</button>
			<button
				className='bg-[#1A1A1A] flex items-center justify-center size-[33px] lg:size-[42.36px] 2xl:size-[64px] border-2  hover:cursor-pointer rounded-[9px]'
				onClick={onNext}>
				{/* Right Arrow */}
				<svg
					width='28'
					height='24'
					viewBox='0 0 28 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M15.9125 1.9707L25.9417 11.9999M25.9417 11.9999L15.9125 22.0291M25.9417 11.9999H1.87164'
						stroke='white'
						strokeWidth='2.29239'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</button>
		</div>
	);
};

export default SliderControl;
