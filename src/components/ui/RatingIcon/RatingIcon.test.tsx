import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import RatingIcon from './RatingIcon';

describe('<RatingIcon />', () => {
  it('exposes an accessible label on the group', () => {
    render(<RatingIcon vote={8} />);
    expect(screen.getByRole('group', { name: 'TMDB rating 8.0' })).toBeInTheDocument();
  });

  it('renders the TMDB badge', () => {
    render(<RatingIcon vote={7.95} />);
    expect(screen.getByText('TMDB')).toBeInTheDocument();
  });

  it('formats the vote to one decimal place', () => {
    render(<RatingIcon vote={7.95} />);
    expect(screen.getByText('8.0')).toBeInTheDocument();
  });

  it('applies custom className to the badge', () => {
    const { getByText } = render(<RatingIcon vote={8} className="shadow" />);
    expect(getByText('TMDB')).toHaveClass('shadow');
  });

  it('falls back gracefully for non-finite numbers', () => {
    render(<RatingIcon vote={Number.NaN} />);
    expect(screen.getByText('–--')).toBeInTheDocument();
  });

  it('passes through data-testid to the group', () => {
    render(<RatingIcon vote={8} data-testid="rating-icon" />);
    expect(screen.getByTestId('rating-icon')).toBeInTheDocument();
  });
});
