"use client";

import { links } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavLinks = () => {
	const path = usePathname();

	return (
		<ul className='flex gap-[30px] bg-[#100F10] py-[10px] px-[9px] rounded-[12px] items-center'>
			{links.map((link) => {
				const isActive = path === link.href;

				return (
					<li key={link.href} className=' w-full min-w-fit'>
						<Link
							href={link.href}
							className={`text-[18px] py-[14px] px-[24px] font-Helvetica lead-[150%] w-full  ${
								isActive ? "bg-[#9E221A] text-white  rounded-[8px]" : "text-[#BFBFBF]"
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
