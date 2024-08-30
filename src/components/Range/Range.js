"use client";

import styles from "./Range.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Range({ defautView = "tv" }) {
	const searchParams = useSearchParams(); //Search the url params
	const pathname = usePathname(); // reads the current path name
	const { replace } = useRouter(); // allows params to be replaced by urs

	const mediaMode = searchParams.get("mediamode") ?? defautView;

	const handleChange = (e) => {
		const params = new URLSearchParams();
		params.set("mediamode", e.target.value);
		replace(`${pathname}/?${params.toString()}`);
	};

	return (
		<select className={styles.inputMediaMode} value={mediaMode} onChange={handleChange}>
			<option value="tv">Tv</option>
			<option value="movie">Movie</option>
		</select>
	);
}
