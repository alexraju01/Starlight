/** @type {import('next').NextConfig} */
const nextConfig = {
	// output: "export",
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "image.tmdb.org",
				port: "",
				pathname: "/t/p/original/**",
			},
			{
				protocol: "https",
				hostname: "flagcdn.com",
				port: "",
				pathname: "/**",
			},
			// {
			// 	protocol: "https",
			// 	hostname: "img.icons8.com",
			// 	port: "",
			// 	pathname: "/ios-filled/50/000000/**",
			// },
		],
	},
};

export default nextConfig;
