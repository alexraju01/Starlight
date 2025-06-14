"use client";

import { links } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavLinks = () => {
	const path = usePathname();

	return (
		<ul className='flex  gap-[16px] py-[6px] px-[6px] rounded-[12px] items-center xl:gap-[30px] xl:py-[10px] xl:px-[9px]'>
			{links.map((link) => {
				const isActive = path === link.href;

				return (
					<li key={link.href} className='w-full min-w-fit xl:w-auto'>
						<Link
							href={link.href}
							className={`text-[16px] py-[10px] px-[16px] font-Helvetica leading-[150%] w-full xl:text-[18px] xl:py-[14px] xl:px-[24px] hover:text-white ${
								isActive ? "bg-[#9E221A] text-white rounded-[8px]" : "text-[#BFBFBF]"
							}`}>
							{link.name}
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default NavLinks;
