"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavLinks.module.css";

export default function NavLinks({ linkData }) {
	const path = usePathname();

	return (
		<li>
			<Link className={path === linkData.href ? styles.active : ""} href={linkData.href}>
				<i>{linkData.icon}</i>
				<p>{linkData.name}</p>
			</Link>
		</li>
	);
}
