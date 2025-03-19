import Sidebar from "../../components/Sidebar/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Sidebar />
			{children}
		</>
	);
};

export default layout;
