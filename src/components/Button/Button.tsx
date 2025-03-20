import styles from "./Button.module.css";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: ReactNode;
	children: ReactNode;
}

export default function Button({ icon, children, ...props }: ButtonProps) {
	return (
		<button className={styles.btn} {...props}>
			{icon && <i>{icon}</i>}
			<p>{children}</p>
		</button>
	);
}
