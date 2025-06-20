const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			{/* <Sidebar /> */}
			<main className='overflow-auto'>{children}</main>
			{/* {children} */}
		</>
	);
};

export default layout;
