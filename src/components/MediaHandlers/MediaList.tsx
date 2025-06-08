"use client";
import { Loader } from "lucide-react";
import { useState } from "react";

import { Media, Movie, TVShow } from "@/types/global";
import { MediaMode } from "@/types/mediaMode";
import getMedia from "@/utils/serverActions/getMedia";
import getUpcoming from "@/utils/serverActions/getUpcoming";

import Button from "../Button/Button";
import UpcomingMedia from "../UpcomingMedia/UpcomingMedia";
import MediaCard2 from "../MediaCard2/MediaCard2";
import { useGenres } from "@/hooks/useGenre";
import { useResponsiveItems } from "@/hooks/useResponsiveItems";
import { DISCOVER_BREAKPOINTS } from "@/constants/breakpoints";

interface Props {
	initialMedia: (Movie | TVShow)[];
	mediaMode: MediaMode;
}

export default function MediaList({ initialMedia, mediaMode }: Props) {
	const [media, setMedia] = useState<(Movie | TVShow)[]>(initialMedia);
	const [page, setPage] = useState<number>(1);
	const [buttonHidden, setButtonHidden] = useState<boolean>(initialMedia.length === 0);
	const [loading, setLoading] = useState<boolean>(false);
	const genres = useGenres(mediaMode);
	const itemsPerRow = useResponsiveItems(DISCOVER_BREAKPOINTS);

	const loadMoreMedia = async () => {
		setLoading(true);

		const mediaList: (Movie | TVShow)[] =
			mediaMode === MediaMode.UPCOMING
				? await getUpcoming(MediaMode.TV, page + 1)
				: await getMedia(mediaMode, page + 1);

		const mediaWithType = mediaList.map((item) => ({
			...item,
			media_type: mediaMode === MediaMode.TV ? "tv" : "movie",
		})) as Media[];

		const newMedia = mediaWithType.filter(
			(newItem) => !media.some((existingMedia) => existingMedia.id === newItem.id)
		);

		setButtonHidden(mediaWithType.length === 0);
		setMedia((prevMedia) => [...prevMedia, ...newMedia]);
		setPage((prevPage) => prevPage + 1);
		setLoading(false);
	};

	return (
		<div className='animate-fadeIn'>
			<div
				className={`
						grid gap-8 w-full transition-all relative
		overflow-hidden
					${
						mediaMode === MediaMode.UPCOMING
							? `
							grid-cols-1 auto-rows-auto p-6
							sm:grid-cols-[repeat(auto-fill,minmax(45rem,1fr))]
						`
							: `
							grid-cols-2 px-6 mb-8
							sm:grid-cols-3
							md:grid-cols-4
                            lg:grid-cols-5 
							xl:grid-cols-6 
							2xl:grid-cols-7
						`
					}
				`}>
				{media.map((item, index) => {
					const isLastInRow = (index + 1) % itemsPerRow === 0 ? true : false;

					if (!item.poster_path) return null;

					if (mediaMode === MediaMode.UPCOMING) {
						return <UpcomingMedia key={item.id} media={item} mediaMode={MediaMode.TV} />;
					}

					return (
						<MediaCard2
							key={item.id}
							item={item}
							genreMap={genres}
							mediaMode={mediaMode}
							isLast={isLastInRow}
						/>
					);
				})}
			</div>

			{!buttonHidden && (
				<div className='flex justify-center col-span-full'>
					<Button
						icon={loading && <Loader className='animate-spin' />}
						onClick={loadMoreMedia}
						disabled={loading}>
						Load More
					</Button>
				</div>
			)}
		</div>
	);
}
