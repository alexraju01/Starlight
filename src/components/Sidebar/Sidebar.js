"use client";
import { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";
import Icons from "../../utils/icons";
import NavLinks from "./NavLinks/NavLinks";

const links = [
	{ name: "Home", href: "/", icon: Icons.home },
	{ name: "Discover", href: "/discover", icon: Icons.compass },
	{ name: "Movies", href: "/movie", icon: Icons.Film },
	{ name: "TV Shows", href: "/tv", icon: Icons.tv },
	{ name: "Genre", href: "/genre", icon: Icons.catergory },
	{ name: "Upcoming", href: "/upcoming", icon: Icons.calendar },
];

export default function Sidebar() {
	const [toggle, setToggle] = useState(false);
	const [mounted, setMounted] = useState(false);

	const handleToggle = () => {
		setToggle(!toggle);
	};

	const closeSidebar = () => {
		if (window.innerWidth < 1200) {
			setToggle(false);
		}
	};

	useEffect(() => {
		setMounted(true);
		const handleResize = () => {
			if (window.innerWidth < 1200) {
				setToggle(false);
			} else {
				setToggle(true);
			}
		};

		// Set the initial state based on the current window width
		handleResize();

		// Add the event listener
		window.addEventListener("resize", handleResize);

		// Clean up the event listener
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<nav className={`${styles.sidebar} ${toggle ? styles.open : styles.close}`}>
			<div className={styles.logo}>
				<p>
					<span className={styles.s}>S</span>
					tar <span className={styles.s}>L</span>ight
				</p>
			</div>

			{/* Sidebar - links items rendered using NavLinks component */}
			<div className={styles.navItems}>
				<ul className={styles.navLinks}>
					{links.map((link, index) => (
						<NavLinks key={index} linkData={link} closeSidebar={closeSidebar} />
					))}
				</ul>

				
					<div className={styles.account}>
						sign in
					</div>
				
			</div>
			<div className={styles.toggleBtn} onClick={handleToggle}>
				<i className={styles.icon}>{Icons.menu}</i>
			</div>
		</nav>
	);
}
