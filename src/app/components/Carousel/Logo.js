"use client";
import { useState, useEffect } from "react";
import { fetchData } from "@/app/utils/fetchData";
import Image from "next/image";

export default function Logo({ id }) {
	const [logoImage, setLogoImage] = useState(null);

	useEffect(() => {
		async function fetchLogo() {
			try {
				const logoImages = await fetchData("3", `movie/${id}/images`);
				const englishLogo = logoImages.logos.find((img) => img.iso_639_1 === "en" && img.file_path);
				// console.log(englishLogo);
				setLogoImage(
					englishLogo ? `https://image.tmdb.org/t/p/original${englishLogo.file_path}` : null
				);
			} catch (error) {
				console.error("Error fetching logo images:", error);
			}
		}
		fetchLogo();
	}, [id]);

	// if (!logoImage) {
	// 	return <p>Loading...</p>;
	// }

	return (
		// <img src="https://image.tmdb.org/t/p/original/gLi5qaqxZbVj2PXQYrah0AFgqkB.png" />
		<Image
			src={logoImage}
			layout="intrinsic"
			width={200}
			height={100}
			alt={`Logo for movie ${id}`}
		/>
	);
}
