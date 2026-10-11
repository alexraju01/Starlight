/**
 * Trims a paginated grid to whole rows so the last row is never half empty while more items
 * can still be loaded. The held-back items aren't lost – they're still in state and fill
 * the start of the next row once the next page arrives.
 *
 * Shows everything when the column count is unknown (before hydration), when there's
 * nothing more to load, or when there isn't even one full row.
 */
export function completeRows<T>(items: T[], columns: number | null, hasMore: boolean): T[] {
  if (!columns || !hasMore) return items;
  const fullRows = items.length - (items.length % columns);
  return fullRows > 0 ? items.slice(0, fullRows) : items;
}
