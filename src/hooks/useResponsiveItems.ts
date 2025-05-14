import { useEffect, useState, useCallback } from "react";

type Breakpoint = { max: number; value: number };

export const useResponsiveItems = (breakpoints: Breakpoint[], defaultValue = 4): number => {
	const [itemsPerScreen, setItemsPerScreen] = useState(defaultValue);

	const updateItems = useCallback(() => {
		const width = window.innerWidth;
		const matched = breakpoints.find((bp) => width <= bp.max);
		const newItems = matched?.value ?? defaultValue;
		setItemsPerScreen((prev) => (prev !== newItems ? newItems : prev));
	}, [breakpoints, defaultValue]);

	useEffect(() => {
		updateItems();
		window.addEventListener("resize", updateItems);
		return () => window.removeEventListener("resize", updateItems);
	}, [updateItems]);

	return itemsPerScreen;
};
