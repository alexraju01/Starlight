"use client";
import Image from "next/image";
import BrokenImage from "./BrokenImage";
import { useState } from "react";

export default function ImageWithFallback({ src, alt }) {
	const [imgError, setImgError] = useState(false);

	return imgError ? (
		<BrokenImage />
	) : (
		<Image
			src={src}
			alt={alt}
			layout="fill"
			objectFit="cover"
			objectPosition="center 20%"
			onError={() => setImgError(true)}
		/>
	);
}
