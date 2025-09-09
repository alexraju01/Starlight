// constants.contract.test.ts
// import { Home, Film, Tv, Grid, Calendar } from 'lucide-react';
import { describe, it, expect } from 'vitest';

import { links } from '@/constants';
import { Icons } from '@/utils';

describe('nav constants (contract)', () => {
  it('contain required entries with correct names, hrefs, and icons', () => {
    expect(links).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Home', href: '/', icon: Icons.home }),
        expect.objectContaining({ name: 'Movies', href: '/movie', icon: Icons.Film }),
        expect.objectContaining({ name: 'TV Shows', href: '/tv', icon: Icons.tv }),
        expect.objectContaining({ name: 'Genre', href: '/genre', icon: Icons.catergory }),
        expect.objectContaining({ name: 'Upcoming', href: '/upcoming', icon: Icons.calendar }),
      ]),
    );
  });

  it('has unique names and hrefs', () => {
    const names = links.map((l) => l.name);
    const hrefs = links.map((l) => l.href);
    expect(new Set(names).size).toBe(names.length);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});
