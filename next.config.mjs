/** @type {import('next').NextConfig} */
const nextConfig = {
	// output: "export",
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "image.tmdb.org",
				port: "",
				// pathname: "/t/p/original/**",
			},
			{
				protocol: "https",
				hostname: "flagcdn.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
