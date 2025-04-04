import { MediaMode } from "@/types/mediaMode";
import getMedia from "@/utils/serverActions/getMedia";
import getUpcoming from "@/utils/serverActions/getUpcoming";

import MediaList from "./MediaList";

interface Props {
	mediaMode: MediaMode;
}

export default async function MediaWrapper({ mediaMode }: Props) {
	let media;

	if (mediaMode === MediaMode.UPCOMING) {
		media = await getUpcoming(MediaMode.TV);
	} else {
		media = await getMedia(mediaMode);
	}
	return <MediaList initialMedia={media} mediaMode={mediaMode} />;
}
