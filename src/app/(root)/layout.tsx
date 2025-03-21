import { Sidebar } from "@/components";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Sidebar />
			{children}
		</>
	);
};

export default layout;
