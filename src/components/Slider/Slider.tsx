import { APIResponse, Media } from "@/types/global";
import { MediaMode } from "@/types/mediaMode";

import fetchData from "../../utils/fetchData";
import MediaCard from "../MediaCard/MediaCard";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../ui/carousel";

interface Props {
	mediaMode: MediaMode;
	endpoint: string;
}

export default async function Home({ mediaMode, endpoint }: Props) {
	const getTopRated = await fetchData<APIResponse>("3", endpoint);
	const topRatedMovies = getTopRated.results;

	return (
		<Carousel
			className='w-full'
			opts={{
				align: "start",
			}}>
			<CarouselContent>
				{topRatedMovies.map((topRated: Media) =>
					topRated.poster_path ? (
						<CarouselItem
							key={topRated.id}
							className={`
								basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 2xl:basis-1/8
								w-full
								px-2
								pt-8
							`}>
							<MediaCard className='rounded-2xl' media={topRated} mediaMode={mediaMode} />
						</CarouselItem>
					) : null
				)}
			</CarouselContent>
			<CarouselPrevious className='text-xl' />
			<CarouselNext />
		</Carousel>
	);
}
