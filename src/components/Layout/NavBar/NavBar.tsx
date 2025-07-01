"use client";

import Link from "next/link";
import { useState } from "react";
import { ROUTES } from "@/constants/route";
import NavLinks from "./NavLinks";
import SearchBox from "@/components/ui/SearchBox/SearchBox";
import { AlignJustify, Sun, X } from "lucide-react";

const NavBar = () => {
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

	const toggleMobileNav = () => {
		setIsMobileNavOpen((prev) => !prev);
	};

	return (
		<header className='fixed top-0 left-0 w-full z-50 bg-[#100F10] h-auto px-6 lg:px-10 py-4'>
			<nav
				className='flex flex-col md:flex-row gap-4 md:gap-10 justify-between items-start md:items-center w-full'
				aria-label='Main Navigation'>
				{/* Logo & Mobile Toggle */}
				<div className='flex items-center w-full justify-between md:w-auto gap-4'>
					<button
						onClick={toggleMobileNav}
						className='md:hidden text-white'
						aria-label={isMobileNavOpen ? "Close Menu" : "Open Menu"}>
						{isMobileNavOpen ? <X size={35} /> : <AlignJustify size={35} />}
					</button>
					<Link href={ROUTES.HOME} aria-label='Go to homepage'>
						<p className='text-[26px] lg:text-[29px] xl:text-[44.87px] font-bold leading-[101%]'>
							<span className='text-primary'>S</span>tar
							<span className='text-primary'>L</span>ight
						</p>
					</Link>

					<div className='text-white'>
						<Sun />
					</div>
				</div>

				{/* Mobile SearchBox under logo */}
				<div className='md:hidden w-full mt-4'>
					<div className=' p-4 rounded-lg'>
						<SearchBox />
					</div>
				</div>

				{/* Desktop NavLinks */}
				<div className='hidden md:flex items-center gap-6 xl:gap-10'>
					<NavLinks />
				</div>

				{/* Right Side (Search, Auth, etc.) */}
				<div className='hidden md:flex justify-end items-center gap-3 xl:gap-5 flex-1'>
					<SearchBox />

					<Link
						href='#'
						className='text-xl xl:text-2xl px-[18px] py-[10px] font-medium text-[#BFBFBF] hover:text-white transition-colors w-[110px] h-[50px] rounded-[12px] border border-[#1D1D1D] border-solid flex items-center justify-center'>
						Login
					</Link>
				</div>
			</nav>

			{/* Mobile Nav Links */}
			{isMobileNavOpen && (
				<div className='md:hidden h-auto absolute top-[90px] left-0 w-full bg-[#100F10] p-6 z-40'>
					<NavLinks className='flex flex-col gap-4' />
					<div className='mt-4 flex flex-col gap-4'>
						<Link
							href='#'
							className='text-lg px-[18px] py-[10px] font-medium text-[#BFBFBF] hover:text-white transition-colors w-full rounded-[12px] border border-[#1D1D1D] border-solid text-center'>
							Login
						</Link>
					</div>
				</div>
			)}
		</header>
	);
};

export default NavBar;
