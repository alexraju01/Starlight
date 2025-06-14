"use client";

import { links } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NavLinks = () => {
	const pathname = usePathname();

	return (
		<ul className='flex items-center gap-3 px-2 py-1.5 rounded-2xl xl:gap-5 xl:px-2.5 xl:py-2.5'>
			{links.map((link) => {
				const isActive = pathname === link.href;

				return (
					<li key={link.href}>
						<Link
							href={link.href}
							aria-current={isActive ? "page" : undefined}
							className={cn(
								"inline-block whitespace-nowrap text-[16px] xl:text-[18px] font-Helvetica leading-[150%] px-4 py-2.5 xl:px-6 xl:py-[14px] rounded-md transition-colors duration-200",
								isActive ? "bg-primary text-white" : "text-[#BFBFBF] hover:text-white"
							)}>
							{link.name}
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default NavLinks;
