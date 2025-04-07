"use client";
import Image from "next/image";
import { useState } from "react";
import BrokenImage from "./BrokenImage";

interface Props {
	src: string;
	alt: string;
	className?: string;
	width?: number;
	height?: number;
}

export default function ImageWithFallback({
	src,
	alt,
	className,
	width, // ideal size based on layout
	height,
}: Props) {
	const [imgError, setImgError] = useState(false);
	return imgError ? (
		<BrokenImage className={className ?? ""} />
	) : (
		<Image
			width={width}
			height={height}
			className={className}
			src={src}
			alt={alt}
			fill
			quality={100}
			objectFit='cover'
			objectPosition='center 20%'
			onError={() => setImgError(true)}
		/>
	);
}
