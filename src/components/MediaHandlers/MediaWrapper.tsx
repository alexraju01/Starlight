import getMedia from "../../utils/serverActions/getMedia";
import MediaList from "./MediaList";
import getUpcoming from "../../utils/serverActions/getUpcoming";
import { MediaMode } from "@/types/mediaMode";

interface Props {
	mediaMode: MediaMode.Movie | MediaMode.TV | MediaMode.UPCOMING | MediaMode.CHECK;
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
