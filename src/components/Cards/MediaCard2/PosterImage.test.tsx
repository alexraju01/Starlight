// components/__tests__/PosterImage.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import PosterImage from './PosterImage';

// Mock next/image to a simple <img>
vi.mock('next/image', () => {
  return {
    __esModule: true,
    default: (props: any) => {
      const { alt, src, className, ...rest } = props;
      return <img alt={alt} src={src} className={className} {...rest} />;
    },
  };
});

// Mock getImageUrl so we control the output
vi.mock('@/utils/image/getImageUrl', () => {
  return {
    getImageUrl: vi.fn((src: string | null, _type: string, _size: string) =>
      src ? `/mocked/${src}` : '/mocked/fallback.jpg',
    ),
  };
});

describe('PosterImage', () => {
  it('renders with mocked src and alt', () => {
    render(<PosterImage src="poster123.jpg" alt="My poster" />);
    const img = screen.getByAltText('My poster') as HTMLImageElement;

    expect(img).toBeInTheDocument();
    expect(img.src).toContain('/mocked/poster123.jpg');
  });

  it('applies custom className in addition to defaults', () => {
    render(<PosterImage src="poster123.jpg" alt="Styled poster" className="rounded-lg" />);
    const img = screen.getByAltText('Styled poster');
    expect(img).toHaveClass('object-cover');
    expect(img).toHaveClass('rounded-lg');
  });

  it('falls back to mocked fallback when src is null', () => {
    render(<PosterImage src={null} alt="No poster" />);
    const img = screen.getByAltText('No poster') as HTMLImageElement;
    expect(img.src).toContain('/mocked/fallback.jpg');
  });
});
