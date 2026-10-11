import { formatRuntime } from '../mediaFormat';

/** Movie runtime, or a show's typical episode length ("45m / ep"). */
export default function displayRuntime({
  episode_run_time,
  runtime,
}: {
  episode_run_time?: number[];
  runtime?: number;
}): string | null {
  const movieRuntime = formatRuntime(runtime);
  if (movieRuntime) return movieRuntime;

  const episodeRuntime = formatRuntime(episode_run_time?.[0]);
  return episodeRuntime ? `${episodeRuntime} / ep` : null;
}
