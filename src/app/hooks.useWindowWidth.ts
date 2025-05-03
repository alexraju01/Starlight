import { useEffect, useState } from "react";

const useWindowWidth = () => {
	const [width, setWidth] = useState<number | null>(null);

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);

		// Set initial width on mount
		handleResize();

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return width;
};

export default useWindowWidth;
