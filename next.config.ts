import { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
	env: {
		TMDB_API_KEY: process.env.TMDB_API_KEY,
	},
	eslint: {
		ignoreDuringBuilds: true, // 👈 This disables ESLint during builds
	},
	// output: "export",
	images: {
		unoptimized: true,
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
		],
	},
};

export default nextConfig;
