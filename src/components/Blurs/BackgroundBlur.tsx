// Abstracted background blur effects into a component
const BlurBackground = () => {
	return (
		<>
			<div className='absolute z-0 size-[400px] left-[-334px] top-[334px] md:bg-[#9E221A70] blur-[225px]' />
			<div className='absolute z-0 size-[400px] right-[-334px] top-1/2 md:bg-[#9E221A70] blur-[255px]' />
		</>
	);
};

export default BlurBackground;
