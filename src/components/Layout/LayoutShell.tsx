"use client";

import { useLayoutStore } from "@/store/layoutStore";
import Sidebar from "./Sidebar/Sidebar";
import NavBar from "./NavBar/NavBar";

// import { useLayoutStore } from "@/store/layout";
// import NavBar from "@/components/Navigation/NavBar";
// import Sidebar from "@/components/Navigation/Sidebar";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
	const isSidebarLayout = useLayoutStore((state) => state.isSidebarLayout);

	return isSidebarLayout ? (
		<div className='flex h-screen w-screen'>
			<Sidebar />
			<main className='flex-1 overflow-auto'>{children}</main>
		</div>
	) : (
		<div className='flex h-screen w-screen'>
			<NavBar />
			<div className='flex-1  overflow-x-hidden'>{children}</div>
		</div>
	);
}
