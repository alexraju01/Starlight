"use client";
import { Loader } from "lucide-react";
import { useState } from "react";

import { Movie, TVShow } from "@/types/global";
import { MediaMode } from "@/types/mediaMode";
import getMedia from "@/utils/serverActions/getMedia";
import getUpcoming from "@/utils/serverActions/getUpcoming";

import Button from "../Button/Button";
import MediaCard from "../MediaCard/MediaCard";
import UpcomingMedia from "../UpcomingMedia/UpcomingMedia";
import Link from "next/link";

interface Props {
	initialMedia: (Movie | TVShow)[];
	mediaMode: MediaMode;
}

export default function MediaList({ initialMedia, mediaMode }: Props) {
	const [media, setMedia] = useState<(Movie | TVShow)[]>(initialMedia);
	const [page, setPage] = useState<number>(1);
	const [buttonHidden, setButtonHidden] = useState<boolean>(initialMedia.length === 0);
	const [loading, setLoading] = useState<boolean>(false);

	const loadMoreMedia = async () => {
		setLoading(true);

		const mediaList: (Movie | TVShow)[] =
			mediaMode === MediaMode.UPCOMING
				? await getUpcoming(MediaMode.TV, page + 1)
				: await getMedia(mediaMode, page + 1);

		const newMedia = mediaList.filter(
			(newItem) => !media.some((existingMedia) => existingMedia.id === newItem.id)
		);

		setButtonHidden(mediaList.length === 0);
		setMedia((prevMedia) => [...prevMedia, ...newMedia]);
		setPage((prevPage) => prevPage + 1);
		setLoading(false);
	};

	return (
		<div className='animate-fadeIn'>
			<div
				className={`
					grid gap-8 w-full transition-all
					${
						mediaMode === MediaMode.UPCOMING
							? `
							grid-cols-1 auto-rows-auto p-6
							sm:grid-cols-[repeat(auto-fill,minmax(45rem,1fr))]
						`
							: `
							grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] p-6 mb-8
							sm:grid-cols-[repeat(auto-fill,minmax(12rem,1fr))]
							md:grid-cols-[repeat(auto-fill,minmax(14rem,1fr))]
							xl:grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] xl:p-16
							2xl:grid-cols-[repeat(auto-fill,minmax(18rem,1fr))]
						`
					}
				`}>
				{media.map((item) =>
					item.poster_path ? (
						<div key={item.id}>
							{mediaMode === MediaMode.UPCOMING ? (
								<UpcomingMedia media={item} mediaMode={MediaMode.TV} />
							) : (
								<Link href={`/${mediaMode}/${item.id}`}>

								<MediaCard media={item} mediaMode={mediaMode} />
									</Link>
							)}
						</div>
					) : null
				)}
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
