export const DisplayName = (media): string => {
	if (media.mediaType === "movie") {
		return media.title;
	}
	return media.originalName;
};
