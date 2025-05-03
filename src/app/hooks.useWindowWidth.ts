import { useEffect, useState } from "react";

const useWindowWidth = () => {
	const [width, setWidth] = useState<number | null>(
		typeof window !== "undefined" ? window.innerWidth : null
	);

	useEffect(() => {
		let timeoutId: ReturnType<typeof setTimeout>;

		const handleResize = () => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => setWidth(window.innerWidth), 100);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return width;
};

export default useWindowWidth;
