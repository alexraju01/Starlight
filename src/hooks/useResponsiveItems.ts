// useResponsiveItems.ts
import { useEffect, useState, useCallback } from "react";

const BREAKPOINTS = [
	{ max: 360, value: 2 },
	{ max: 640, value: 2 },
	{ max: 768, value: 3 },
	{ max: 1280, value: 3 },
	{ max: 1580, value: 5 },
];

export const useResponsiveItems = (totalItems: number) => {
	const [itemsPerScreen, setItemsPerScreen] = useState(4);

	const updateItems = useCallback(() => {
		const width = window.innerWidth;
		const matched = BREAKPOINTS.find((bp) => width <= bp.max);
		const newItems = matched?.value || 6;
		setItemsPerScreen((prev) => (prev !== newItems ? newItems : prev));
	}, []);

	useEffect(() => {
		updateItems();
		window.addEventListener("resize", updateItems);
		return () => window.removeEventListener("resize", updateItems);
	}, [updateItems]);

	return itemsPerScreen;
};
