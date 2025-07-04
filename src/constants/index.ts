import Icons from "@/utils/icons";

export const links = [
	{ name: "Home", href: "/", icon: Icons.home },
	// { name: "Discover", href: "/discover", icon: Icons.compass },
	{ name: "Movies", href: "/movie", icon: Icons.Film },
	{ name: "TV Shows", href: "/tv", icon: Icons.tv },
	{ name: "Genre", href: "/genre", icon: Icons.catergory },
	{ name: "Upcoming", href: "/upcoming", icon: Icons.calendar },
];

export const ENDPOINTS = {
	TRENDING_MOVIES: "trending/movie/day",
	POPULAR_MOVIES: "movie/popular",
	TRENDING_TV: "trending/tv/day",
};
