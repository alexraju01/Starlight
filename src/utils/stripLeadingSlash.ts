export function stripLeadingSlash(path: string | null | undefined): string {
  if (!path) return '';
  return path.startsWith('/') ? path.slice(1) : path;
}
