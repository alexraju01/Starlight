"use client";
import { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";
import Icons from "../../utils/icons";
import NavLinks from "../NavLinks/NavLinks";

const links = [
	{ name: "Home", href: "/", icon: Icons.home },
	{ name: "Discover", href: "/discover", icon: Icons.compass },
	{ name: "Movies", href: "/movies", icon: Icons.Film },
	{ name: "Genre", href: "/genre", icon: Icons.catergory },
];

export default function Sidebar() {
	const [toggle, setToggle] = useState(false);

	const handleToggle = () => {
		setToggle(!toggle);
	};
	return (
		<header className={`${styles.header} ${toggle ? styles.toggleHeader : ""}`}>
			<nav className={styles.sidebar}>
				<div className={styles.logo}>
					<p>
						<span className={styles.s}>S</span>
						tar <span className={styles.s}>L</span>ight
					</p>
				</div>

				{/* Sidebar - links items rendered using NavLinks component*/}
				<ul className={styles.navItems}>
					<div className={styles.navLinks}>
						{links.map((link, index) => {
							return <NavLinks key={index} linkData={link} />;
						})}
					</div>

					<div className={styles.account}>
						<div className="Login">Login</div>
					</div>
				</ul>
				<div
					className={`${styles.btnToggle} ${toggle ? styles.rotate : ""}`}
					onClick={handleToggle}
				>
					<span>&#10140;</span>
				</div>
			</nav>
		</header>
	);
}
