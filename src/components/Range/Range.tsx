// "use client";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";

// import styles from "./Range.module.css";

// interface RangeProps {
// 	defautView?: "tv" | "movie"; // ✅ Type for props
// }

// export default function Range({ defautView = "tv" }: RangeProps) {
// 	const searchParams = useSearchParams(); // Search URL params
// 	const pathname = usePathname(); // Reads the current path name
// 	const { replace } = useRouter(); // Allows params to be replaced in the URL

// 	const mediaMode = (searchParams.get("mediamode") as "tv" | "movie") ?? defautView; // ✅ Type assertion

// 	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// 		const params = new URLSearchParams();
// 		params.set("mediamode", e.target.value);
// 		replace(`${pathname}/?${params.toString()}`);
// 	};

// 	return (
// 		<select className={styles.inputMediaMode} value={mediaMode} onChange={handleChange}>
// 			<option value='tv'>Tv</option>
// 			<option value='movie'>Movie</option>
// 		</select>
// 	);
// }
