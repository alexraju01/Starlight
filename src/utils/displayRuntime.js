export function displayRuntime({ episode_run_time, runtime }) {
	const movieRuntime = runtime ? `${runtime} mins` : null;

	const episodeRuntime =
		Array.isArray(episode_run_time) && episode_run_time.length
			? `${episode_run_time[0]} MPE`
			: null;

	const displayRuntime = movieRuntime || episodeRuntime || "N/A";
	return displayRuntime;
}
