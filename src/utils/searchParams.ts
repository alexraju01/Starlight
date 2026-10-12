/** A search param's value; repeated params (`?a=1&a=2`) use the first. */
export const firstParam = (value?: string | string[]): string | undefined =>
  Array.isArray(value) ? value[0] : value;
