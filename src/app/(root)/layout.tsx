import { NavBar } from "@/components";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<NavBar />
			<main className='overflow-auto'>{children}</main>
			{/* {children} */}
		</>
	);
};

export default layout;
