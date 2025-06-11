import NavLinks from "./NavLinks";

const NavBar = () => {
	return (
		<nav className='absolute   flex justify-between items-center px-10 z-1 max-w-screen h-[90px] bg-[#141414]'>
			<div>Starlight</div>
			<NavLinks />
			<div>Login</div>
		</nav>
	);
};

export default NavBar;
