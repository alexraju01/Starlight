"use client";

import { useEffect, useState } from "react";
import Icons from "@/utils/icons";
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
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(min-width: 1200px)");
		const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
			setIsOpen(e.matches);
		};

		handleMediaChange(mediaQuery);
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
		<nav
			className={`fixed top-0 left-0 z-10 h-screen bg-[#100f10] text-white border-r border-[#252525] transition-all duration-300 ${
				isOpen ? "min-w-70 translate-x-0" : "w-0"
			} xl:sticky xl:w-70`}
			style={{ borderRight: "0.1rem solid #252525" }}>
			<div
				className={`flex justify-center items-center pt-12 pb-4 text-3xl font-semibold whitespace-nowrap transition-all duration-300 ${
					isOpen ? "translate-x-0 w-full" : "-translate-x-80 w-0"
				}`}>
				<p>
					<span className='text-[#9e221a] font-bold'>S</span>tar{" "}
					<span className='text-[#9e221a] font-bold'>L</span>ight
				</p>
			</div>

			<ul
				className={`flex flex-col gap-4 pt-4 transition-all duration-300 ${
					isOpen ? "translate-x-0" : "-translate-x-80 w-0"
				}`}>
				{links.map((link) => (
					<NavLinks key={link.href} linkData={link} closeSidebar={closeSidebarOnMobile} />
				))}
			</ul>

			{/* Toggle Button */}
			<button
				onClick={toggleSidebar}
				aria-label='Toggle Sidebar'
				className='absolute left-full top-0 w-24 h-24 text-3xl bg-[#100f10] rounded-br-full xl:hidden hover:cursor-pointer'>
				<span className='absolute top-4 left-4'>{Icons.menu}</span>
			</button>
		</nav>
	);
}
