"use client";

import { useEffect, useState } from "react";

import Icons from "@/utils/icons";

import NavLinks from "./NavLinks/NavLinks";
import styles from "./Sidebar.module.css";

const links = [
	{ name: "Home", href: "/", icon: Icons.home },
	{ name: "Discover", href: "/discover", icon: Icons.compass },
	{ name: "Movies", href: "/movie", icon: Icons.Film },
	{ name: "TV Shows", href: "/tv", icon: Icons.tv },
	{ name: "Genre", href: "/genre", icon: Icons.catergory },
	{ name: "Upcoming", href: "/upcoming", icon: Icons.calendar },
];

export default function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		// Setup matchMedia for responsiveness
		const mediaQuery = window.matchMedia("(min-width: 1200px)");

		const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
			setIsOpen(e.matches);
		};

		// Initial check
		handleMediaChange(mediaQuery);

		// Listen for changes
		mediaQuery.addEventListener("change", handleMediaChange);

		return () => mediaQuery.removeEventListener("change", handleMediaChange);
	}, []);

	const toggleSidebar = () => setIsOpen((prev) => !prev);

	const closeSidebarOnMobile = () => {
		if (window.innerWidth < 1200) {
			setIsOpen(false);
		}
	};

	return (
		<nav className={`${styles.sidebar} ${isOpen ? styles.open : styles.close}`}>
			<div className={styles.logo}>
				<p>
					<span className={styles.s}>S</span>
					tar <span className={styles.s}>L</span>ight
				</p>
			</div>

			<ul className={styles.navLinks}>
				{links.map((link) => (
					<NavLinks key={link.href} linkData={link} closeSidebar={closeSidebarOnMobile} />
				))}
			</ul>

			<button className={styles.toggleBtn} onClick={toggleSidebar} aria-label='Toggle Sidebar'>
				<span className={styles.icon}>{Icons.menu}</span>
			</button>
		</nav>
	);
}
