import MediaWrapper from "@/components/Media/MediaHandlers/MediaWrapper";
import { MediaMode } from "@/types/mediaMode";

export default function MoviesPage() {
	return (
		<div className='flex flex-col mt-50 md:mt-40 w-full animate-fadeIn'>
			<h2 className='text-2xl text-center'>Movies List</h2>
			<MediaWrapper mediaMode={MediaMode.MOVIE} />
		</div>
	);
}
