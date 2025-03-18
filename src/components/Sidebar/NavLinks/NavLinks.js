"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavLinks.module.css";

export default function NavLinks({
	linkData: { href, icon, name },
	closeSidebar,
}) {
	const path = usePathname();

	const handleClick = () => {
		if (closeSidebar) {
			closeSidebar();
		}
	};

	return (
		<li role="listitem">
			<Link
				className={path === href ? styles.active : ""}
				href={href}
				onClick={handleClick}
			>
				<i>{icon}</i>
				<p>{name}</p>
			</Link>
		</li>
	);
}
