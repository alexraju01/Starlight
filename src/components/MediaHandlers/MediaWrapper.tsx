import { MediaMode } from "@/types/mediaMode";
import getMedia from "@/utils/serverActions/getMedia";
import getUpcoming from "@/utils/serverActions/getUpcoming";

import MediaList from "./MediaList";
import { Media, Movie, TVShow } from "@/types/global";

interface Props {
	mediaMode: MediaMode;
}

export default async function MediaWrapper({ mediaMode }: Props) {
	// let media;

	const rawMedia =
		mediaMode === MediaMode.UPCOMING ? await getUpcoming(MediaMode.TV) : await getMedia(mediaMode);

	// Add `media_type` and cast only after shaping
	const mediaWithType = rawMedia.map((item) => ({
		...item,
		media_type: mediaMode === MediaMode.TV ? "tv" : "movie",
	})) as Media[];

	return <MediaList initialMedia={mediaWithType} mediaMode={mediaMode} />;
}
