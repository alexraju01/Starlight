/** a1, b1, a2, b2, … then whatever is left of the longer list. */
export const interleave = <T>(a: T[], b: T[]): T[] =>
  Array.from({ length: Math.max(a.length, b.length) }, (_, i) => [a[i], b[i]])
    .flat()
    .filter((item): item is T => item !== undefined);
