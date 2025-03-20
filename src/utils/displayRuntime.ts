export function displayRuntime({
	episode_run_time,
	runtime,
}: {
	episode_run_time?: number[];
	runtime?: number;
}) {
	const movieRuntime = runtime ? `${runtime} mins` : null;

	const episodeRuntime =
		Array.isArray(episode_run_time) && episode_run_time.length
			? `${episode_run_time[0]} MPE`
			: null;

	return movieRuntime || episodeRuntime || "N/A";
}
