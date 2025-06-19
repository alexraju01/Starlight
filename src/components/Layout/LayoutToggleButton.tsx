"use client";

import { LayoutGrid, LayoutList } from "lucide-react";
import { useLayoutStore } from "@/store/layoutStore";

const LayoutToggleButton = () => {
	const isSidebarLayout = useLayoutStore((state) => state.isSidebarLayout);
	const toggleLayout = useLayoutStore((state) => state.toggleLayout);

	return (
		<button
			onClick={toggleLayout}
			aria-label='Toggle Layout'
			className='w-[50px] h-[50px] rounded-[12px] border border-[#1D1D1D] text-[#BFBFBF] hover:text-white transition-colors flex items-center justify-center'>
			{isSidebarLayout ? <LayoutGrid size={24} /> : <LayoutList size={24} />}
		</button>
	);
};

export default LayoutToggleButton;
