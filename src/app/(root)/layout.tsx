import { Sidebar } from "@/components";
import LayoutShell from "@/components/Layout/LayoutShell";
import NavBar from "@/components/Layout/NavBar/NavBar";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			{/* <Sidebar /> */}
			<LayoutShell>{children}</LayoutShell>
			{/* {children} */}
		</>
	);
};

export default layout;
