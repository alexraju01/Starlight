import { Sidebar } from "@/components";
import NavBar from "@/components/Layout/NavBar/NavBar";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<NavBar />
			{/* <Sidebar /> */}
			{children}
		</>
	);
};

export default layout;
