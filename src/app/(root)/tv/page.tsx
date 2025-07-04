import { Suspense } from "react";

import { MediaMode } from "@/types/mediaMode";
import MediaWrapper from "@/components/Media/MediaHandlers/MediaWrapper";
import { LoadingSkeletons } from "@/components/Feedback/LoadingSkeletons";

export default function Tv() {
	return (
		<div className='flex flex-col mt-16 w-full'>
			<h2 className='text-3xl text-center'>TV Shows List</h2>
			<Suspense fallback={<LoadingSkeletons />}>
				<MediaWrapper mediaMode={MediaMode.TV} />
			</Suspense>
		</div>
	);
}
