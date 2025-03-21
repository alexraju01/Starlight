"use client";
import Image from "next/image";
// import BrokenImage from "./BrokenImage";
import { useState } from "react";

import BrokenImage from "./BrokenImage";

interface Props {
	src: string;
	alt: string;
	className?: string;
}

export default function ImageWithFallback({ src, alt, className }: Props) {
	const [imgError, setImgError] = useState(false);
	return imgError ? (
		<BrokenImage className={className ?? ""} />
	) : (
		<Image
			// className={className}
			src={src}
			alt={alt}
			layout='fill'
			quality={100}
			objectFit='cover'
			objectPosition='center 20%'
			onError={() => setImgError(true)}
		/>
	);
}
