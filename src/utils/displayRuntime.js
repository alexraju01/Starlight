export function displayRuntime(mediaDetails) {
	const movieRuntime = mediaDetails.runtime ? `${mediaDetails.runtime} mins` : null;

	const episodeRuntime =
		Array.isArray(mediaDetails.episode_run_time) && mediaDetails.episode_run_time.length
			? `${mediaDetails.episode_run_time} MPE`
			: null;

	const displayRuntime = movieRuntime || episodeRuntime || "N/A";
	return displayRuntime;
}
