/**
 * TMDB/JustWatch don't give a link to the title on each service, so services with a public
 * search page get one, searching for the title. Matched by name because add-on channels
 * ("HBO Max Amazon Channel") have their own provider ids but live on the parent service.
 */
const SEARCH_URLS: [pattern: RegExp, url: (query: string) => string][] = [
  [/amazon|prime video/i, (q) => `https://www.primevideo.com/search?phrase=${q}`],
  [/^netflix/i, (q) => `https://www.netflix.com/search?q=${q}`],
  [/^apple tv/i, (q) => `https://tv.apple.com/search?term=${q}`],
  [/^youtube/i, (q) => `https://www.youtube.com/results?search_query=${q}`],
  [/^google play/i, (q) => `https://play.google.com/store/search?q=${q}&c=movies`],
];

/** The service's search page for `title`, or null if we don't know one. */
export function providerSearchUrl(providerName: string, title: string): string | null {
  const match = SEARCH_URLS.find(([pattern]) => pattern.test(providerName));
  return match ? match[1](encodeURIComponent(title)) : null;
}
