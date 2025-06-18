"use client";

import Link from "next/link";
import { ROUTES } from "@/constants/route";
import NavLinks from "./NavLinks";
import SearchBox from "@/components/ui/SearchBox/SearchBox";

const NavBar = () => {
	return (
		<header className='fixed  top-0 left-0 w-full z-11 bg-[#100F10] h-[90px] flex items-center px-6 lg:px-10'>
			<nav className='flex gap-10 justify-between items-center w-full' aria-label='Main Navigation'>
				{/* Logo & Nav */}
				<div className='flex items-center gap-6 xl:gap-10'>
					<Link href={ROUTES.HOME} aria-label='Go to homepage'>
						<p className='text-[26px] lg:text-[29px] xl:text-[44.87px] font-bold leading-[101%]'>
							<span className='text-primary'>S</span>tar
							<span className='text-primary'>L</span>ight
						</p>
					</Link>
					<NavLinks />
				</div>

				{/* Right Side (Search, Auth, etc.) */}
				<div className='w-full flex justify-end items-center gap-3 xl:gap-5'>
					<SearchBox />
					<Link
						href='#'
						className='text-xl xl:text-2xl px-[18px] py-[10px] font-medium text-[#BFBFBF] hover:text-white transition-colors w-[110px] h-[50px] rounded-[12px] border border-[#1D1D1D] border-solid flex items-center justify-center'>
						Login
					</Link>
					<Link
						href='#'
						className='text-xl xl:text-2xl px-[18px] py-[10px] font-medium text-[#BFBFBF] hover:text-white transition-colors w-[110px] h-[50px] rounded-[12px] border border-[#1D1D1D] border-solid flex items-center justify-center'>
						Sign Up
					</Link>
				</div>
			</nav>
		</header>
	);
};

export default NavBar;
