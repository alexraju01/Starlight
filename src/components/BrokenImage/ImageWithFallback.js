"use client";
import Image from "next/image";
// import BrokenImage from "./BrokenImage";
import { useState } from "react";
import BrokenImage from "./BrokenImage";

export default function ImageWithFallback({ src, alt, className }) {
	const [imgError, setImgError] = useState(false);
	return imgError ? (
		<BrokenImage className={className} />
	) : (
		<Image
			// className={className}
			src={src}
			alt={alt}
			layout="fill"
			objectFit="cover"
			objectPosition="center 20%"
			onError={() => setImgError(true)}
		/>
	);
}
