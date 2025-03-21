import { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

interface Props {
	icon?: ReactNode;
	children: ReactNode;
}

export default function SectionHeading({ children, icon }: Props) {
	return (
		<div className={styles.heading}>
			<i>{icon}</i>
			<h2>{children}</h2>
		</div>
	);
}
