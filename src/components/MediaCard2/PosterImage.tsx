import { getImageUrl } from "@/utils/image/getImageUrl";
import Image from "next/image";

interface Props {
	src: string | null;
	alt: string;
	className?: string; // <- Add this
}

export default function PosterImage({ src, alt, className }: Props) {
	return (
		<Image
			src={getImageUrl(src, "poster", "w500")}
			alt={alt}
			fill
			quality={90}
			className={`object-cover  ${className || ""}`}
		/>
	);
}
