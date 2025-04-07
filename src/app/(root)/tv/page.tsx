import { Suspense } from "react";

import { LoadingSkeletons } from "@/components";
import MediaWrapper from "@/components/MediaHandlers/MediaWrapper";
import { MediaMode } from "@/types/mediaMode";

export default async function Tv() {
	return (
		<div className='flex flex-col mt-16 w-full'>
			<h2 className='text-3xl text-center'>TV Shows List</h2>
			<Suspense fallback={<LoadingSkeletons />}>
				<MediaWrapper mediaMode={MediaMode.TV} />
			</Suspense>
		</div>
	);
}
