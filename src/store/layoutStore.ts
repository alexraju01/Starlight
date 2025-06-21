import { create } from "zustand";

interface LayoutStore {
	isSidebarLayout: boolean;
	toggleLayout: () => void;
	setLayout: (value: boolean) => void;
}

export const useLayoutStore = create<LayoutStore>((set) => ({
	isSidebarLayout: false,
	toggleLayout: () => set((state) => ({ isSidebarLayout: !state.isSidebarLayout })),
	setLayout: (value) => set({ isSidebarLayout: value }),
}));
