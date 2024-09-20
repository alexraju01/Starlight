import getMedia from "../../utils/serverActions/getMedia";
import MediaList from "./MediaList";
import getUpcoming from "../../utils/serverActions/getUpcoming";

export default async function MediaWrapper({ mediaMode }) {
	let media;

	if (mediaMode === "upcoming") {
		media = await getUpcoming("tv");
	} else {
		media = await getMedia(mediaMode);
	}
	return <MediaList initialMedia={media} mediaMode={mediaMode} />;
}
