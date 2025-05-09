import { getImageUrl } from "@/utils/image/getImageUrl";
import Image from "next/image";

interface Props {
	src: string | null;
	alt: string;
}

export default function PosterImage({ src, alt }: Props) {
	return (
		<Image
			src={getImageUrl(src, "poster", "w500")}
			alt={alt}
			fill
			quality={90}
			className='object-cover rounded-[10.93px]'
		/>
	);
}
