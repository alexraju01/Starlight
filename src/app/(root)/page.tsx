import { Suspense } from "react";

import { SearchBox, Slider, Carousel } from "@/components";
import { Spinner } from "@/components/LoadingSkeletons";
import { MediaMode } from "@/types/mediaMode";

export default async function Home() {
	const mediaMode: MediaMode = MediaMode.Movie;

	return (
		<main className='grid grid-rows-[auto_auto_auto_auto] w-full text-2xl sm:text-base '>
			<Suspense fallback={<Spinner />}>
				<div className=' hidden lg:flex w-full flex-wrap items-center justify-between py-7'>
					<div className='ml-21 w-full'>
						<SearchBox />
					</div>
				</div>

				<div className='relative w-full mb-8 rounded-xl lg:px-16'>
					<Carousel mediaMode={mediaMode} />
				</div>

				<div className='w-full mb-4 px-16'>
					<h2 className='ml-3 text-xl font-semibold'>Top 20 Rated</h2>
					<Slider mediaMode={mediaMode} endpoint={`${mediaMode}/top_rated`} />
				</div>

				<div className='w-full mb-4 px-16 '>
					<h2 className='ml-3 text-xl font-semibold'>Popular</h2>
					<Slider mediaMode={mediaMode} endpoint={`${mediaMode}/popular`} />
				</div>
			</Suspense>
		</main>
	);
}
