// NavLinks.test.tsx
import { render, screen, fireEvent, within } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock first
vi.mock('next/navigation', () => ({ usePathname: vi.fn() }));
vi.mock('@/constants', () => ({
  links: [
    { name: 'Home', href: '/' },
    { name: 'Movies', href: '/movie' },
    { name: 'TV Shows', href: '/tv' },
  ],
}));

import { usePathname } from 'next/navigation';

import { links } from '@/constants';

import NavLinks from './NavLinks';

const mockedUsePathname = vi.mocked(usePathname);

const renderWithPath = (pathname = '/', props: React.ComponentProps<typeof NavLinks> = {}) => {
  mockedUsePathname.mockReturnValue(pathname);
  return render(<NavLinks {...props} />);
};

describe('NavLinks (behavior)', () => {
  beforeEach(() => mockedUsePathname.mockReset());

  it('renders exactly one <li><a> per link with exact names & hrefs', () => {
    renderWithPath('/');
    const list = screen.getByRole('list');
    expect(within(list).getAllByRole('listitem')).toHaveLength(links.length);
    links.forEach(({ name, href }) => {
      const a = screen.getByRole('link', { name }) as HTMLAnchorElement;
      expect(a).toHaveAttribute('href', href);
    });
  });

  it.each(links.map((l) => [l.name, l.href]))(
    'marks "%s" active when pathname is "%s"',
    (name, href) => {
      renderWithPath(href);
      const active = screen.getByRole('link', { name });
      expect(active).toHaveAttribute('aria-current', 'page');
      expect(active).toHaveClass('bg-primary');
      links
        .filter((l) => l.href !== href)
        .forEach(({ name: other }) => {
          const el = screen.getByRole('link', { name: other });
          expect(el).not.toHaveAttribute('aria-current', 'page');
          expect(el).not.toHaveClass('bg-primary');
        });
    },
  );

  it('calls onLinkClick if provided', () => {
    const onLinkClick = vi.fn();
    renderWithPath('/', { onLinkClick });
    fireEvent.click(screen.getByRole('link', { name: links[0].name }));
    expect(onLinkClick).toHaveBeenCalledTimes(1);
  });

  it('merges custom className on the <ul>', () => {
    renderWithPath('/', { className: 'extra' });
    expect(screen.getByRole('list')).toHaveClass('extra');
  });
});
