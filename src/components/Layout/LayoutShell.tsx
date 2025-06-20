"use client";

import { useLayoutStore } from "@/store/layoutStore";
import Sidebar from "./Sidebar/Sidebar";
import NavBar from "./NavBar/NavBar";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
	const isSidebarLayout = useLayoutStore((state) => state.isSidebarLayout);

	return isSidebarLayout ? (
		<>
			<Sidebar />
			<main className='flex-1 overflow-auto'>{children}</main>
		</>
	) : (
		<>
			<NavBar />
			<div className='flex-1  overflow-x-hidden'>{children}</div>
		</>
	);
}
