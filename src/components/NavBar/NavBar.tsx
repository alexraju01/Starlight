import { ROUTES } from "@/constants/route";
import NavLinks from "./NavLinks";
import Link from "next/link";

const NavBar = () => {
	return (
		<nav className='fixed w-full  flex justify-between items-center px-10 z-10  h-[90px] bg-[#141414]'>
			{/* <nav className='fixed w-full  flex justify-between items-center px-10 z-1  h-[90px] bg-[#141414]'> */}
			<Link href={ROUTES.HOME}>
				<p className='text-[26px] lg:text-[29px] xl:text-[44.87px]  font-bold leading-[101%]'>
					<span className='text-[#9e221a]'>S</span>tar
					<span className='text-[#9e221a]'>L</span>ight
				</p>
			</Link>
			<NavLinks />
			<div>Login</div>
		</nav>
	);
};

export default NavBar;
