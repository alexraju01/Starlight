"use client";

import { Media } from "@/types/global";
import { isMovie, isTVShow } from "@/utils/typeGuard";
import { MediaMode } from "@/types/mediaMode";
import { useResponsiveItems } from "@/hooks/useResponsiveItems";
import { DISCOVER_BREAKPOINTS } from "@/constants/breakpoints";
import MediaCard2 from "@/components/Cards/MediaCard2/MediaCard2";

interface Props {
	media: Media[];
	genreMap: {
		movie: Record<number, string>;
		tv: Record<number, string>;
	};
}

export default function MovieGrid({ media, genreMap }: Props) {
	const columns = useResponsiveItems(DISCOVER_BREAKPOINTS);

	if (!media.length || columns === null) return null;

	return (
		<div className='relative overflow-visible grid p-6 w-full transition-all duration-300 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl:p-16 gap-8 2xl:grid-cols-7'>
			{media.map((item, index) => {
				const isFirst = index % columns === 0;
				const isLast = (index + 1) % columns === 0;

				return (
					<MediaCard2
						key={item.id}
						item={item}
						genreMap={isMovie(item) ? genreMap.movie : genreMap.tv}
						mediaMode={isMovie(item) ? MediaMode.MOVIE : item.media_type}
						isFirst={isFirst}
						isLast={isLast}
					/>
				);
			})}
		</div>
	);
}
