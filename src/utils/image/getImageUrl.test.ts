import { describe, it, expect, expectTypeOf } from 'vitest';

import { getImageUrl } from './getImageUrl';

const BASE_URL = 'https://image.tmdb.org/t/p';

/**
 * Authoritative, typed whitelist of sizes by category.
 * Using `as const` keeps literal types and helps catch typos in test data itself.
 */
const SIZES = {
  backdrop: ['w300', 'w780', 'w1280', 'original'] as const,
  logo: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'] as const,
  poster: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'] as const,
  profile: ['w45', 'w185', 'h632', 'original'] as const,
};

/**
 * Utility: run the same assertions across a matrix of inputs.
 */
function assertUrl(path: string, size: string) {
  return `${BASE_URL}/${size}${path}`;
}

describe('getImageUrl()', () => {
  describe('nullish/empty paths', () => {
    it('returns empty string for null', () => {
      // @ts-expect-no-error
      expect(getImageUrl(null, 'poster', 'w500')).toBe('');
    });

    it('returns empty string for undefined', () => {
      // @ts-expect-no-error
      expect(getImageUrl(undefined, 'poster', 'w500')).toBe('');
    });

    it('returns empty string for empty string', () => {
      expect(getImageUrl('', 'poster', 'w500')).toBe('');
    });
  });

  describe('leading slash behavior', () => {
    it('preserves the leading slash if provided by the caller', () => {
      const path = '/abc123.jpg';
      expect(getImageUrl(path, 'poster', 'w500')).toBe(assertUrl(path, 'w500'));
    });

    it('does not inject a slash if missing (caller responsibility)', () => {
      const path = 'abc123.jpg';
      expect(getImageUrl(path, 'poster', 'w342')).toBe(assertUrl(path, 'w342'));
    });
  });

  describe('whitelisted sizes by category (exhaustive)', () => {
    const samplePath = '/sample.png';

    it('backdrop', () => {
      for (const size of SIZES.backdrop) {
        expect(getImageUrl(samplePath, 'backdrop', size)).toBe(assertUrl(samplePath, size));
      }
    });

    it('logo', () => {
      for (const size of SIZES.logo) {
        expect(getImageUrl(samplePath, 'logo', size)).toBe(assertUrl(samplePath, size));
      }
    });

    it('poster', () => {
      for (const size of SIZES.poster) {
        expect(getImageUrl(samplePath, 'poster', size)).toBe(assertUrl(samplePath, size));
      }
    });

    it('profile', () => {
      for (const size of SIZES.profile) {
        expect(getImageUrl(samplePath, 'profile', size)).toBe(assertUrl(samplePath, size));
      }
    });
  });

  describe('type-level contract (compile-time)', () => {
    it('infers return type as string and enforces valid size per category', () => {
      // Valid pairs compile and return string:
      expectTypeOf(getImageUrl('/x.jpg', 'poster', 'w780')).toEqualTypeOf<string>();
      expectTypeOf(getImageUrl('/x.jpg', 'logo', 'w500')).toEqualTypeOf<string>();
      expectTypeOf(getImageUrl('/x.jpg', 'backdrop', 'w1280')).toEqualTypeOf<string>();
      expectTypeOf(getImageUrl('/x.jpg', 'profile', 'h632')).toEqualTypeOf<string>();

      // Invalid pairs are rejected at compile time:
      // @ts-expect-error - 'h632' is not allowed for 'poster'
      getImageUrl('/x.jpg', 'poster', 'h632');

      // @ts-expect-error - 'w1280' is not allowed for 'logo'
      getImageUrl('/x.jpg', 'logo', 'w1280');

      // @ts-expect-error - 'w92' is not allowed for 'backdrop'
      getImageUrl('/x.jpg', 'backdrop', 'w92');

      // @ts-expect-error - 'w300' is not allowed for 'profile'
      getImageUrl('/x.jpg', 'profile', 'w300');
    });

    it('works without explicit generics (no leakage of T/S in call sites)', () => {
      const url = getImageUrl('/p.png', 'logo', 'original');
      expect(url).toBe(`${BASE_URL}/original/p.png`);
    });
  });

  describe('regression guardrails', () => {
    it('never returns undefined or null (strict contract)', () => {
      // Narrow “truthy” branch
      expect(getImageUrl('/y.jpg', 'poster', 'w500')).toStrictEqual(`${BASE_URL}/w500/y.jpg`);
      // Falsy branch already covered above. This test makes the intent explicit.
    });

    it('does not mutate inputs (pure function)', () => {
      const path = '/immutable.jpg' as const;
      const url = getImageUrl(path, 'poster', 'w500');
      expect(url).toBe(`${BASE_URL}/w500/immutable.jpg`);
      // Path should remain unchanged (string immutability, but we assert intention)
      expect(path).toBe('/immutable.jpg');
    });
  });
});
