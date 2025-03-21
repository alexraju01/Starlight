"use client";

import styles from "./GoBack.module.css";

import Icons from "../../utils/icons";
import { useRouter } from "next/navigation";
export default function GoBack() {
	const router = useRouter();
	return (
		<button className={styles.goBackBtn} type='button' onClick={() => router.back()}>
			{Icons.goBack}
		</button>
	);
}
