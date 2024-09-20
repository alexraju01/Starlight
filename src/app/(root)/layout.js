import Sidebar from "../../components/Sidebar/Sidebar";

export default function Layout({ children }) {
	return (
		<>
			<Sidebar />
			{children}
		</>
	);
}
