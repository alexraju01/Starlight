"use client";
import { Media } from "@/types/global";
import MediaCard from "../MediaCard/MediaCard";

interface Props {
	media: Media[];
}

export default function MovieGrid({ media }: Props) {
	if (!media.length) return null;

	return (
		<div
			className='
				grid 
				grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] 
				gap-8 
				p-6 
				w-full 
				transition-all 
				duration-300

				sm:grid-cols-[repeat(auto-fill,minmax(12rem,1fr))]
				md:grid-cols-[repeat(auto-fill,minmax(14rem,1fr))]
				xl:grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]
				xl:p-16
				2xl:grid-cols-[repeat(auto-fill,minmax(18rem,1fr))]
			'>
			{media.map((multi) => (
				<div key={multi.id}>
					<MediaCard media={multi} mediaMode={multi.media_type} />
				</div>
			))}
		</div>
	);
}
