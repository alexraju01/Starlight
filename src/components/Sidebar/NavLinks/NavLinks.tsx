"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./NavLinks.module.css";

interface LinkData {
	href: string;
	icon: React.ReactNode;
	name: string;
}

interface NavLinksProps {
	linkData: LinkData;
	closeSidebar?: () => void;
}

export default function NavLinks({ linkData, closeSidebar }: NavLinksProps) {
	const path = usePathname();

	const handleClick = () => {
		if (closeSidebar) {
			closeSidebar();
		}
	};

	return (
		<li role='listitem'>
			<Link
				className={path === linkData.href ? styles.active : ""}
				href={linkData.href}
				onClick={handleClick}>
				<i>{linkData.icon}</i>
				<p>{linkData.name}</p>
			</Link>
		</li>
	);
}
