import React from "react";

import styles from "./Spinner.module.css";

interface Props {
	className?: string;
}

export default function Spinner({ className }: Props) {
	return (
		<div className={`${styles.spinner} ${className}`}>
			<div className={styles.loading}></div>
		</div>
	);
}
