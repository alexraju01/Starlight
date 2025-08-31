import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import Button from './Button';

describe('<Button />', () => {
  it('renders the children as the accessible label', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('renders an icon and keeps it out of the accessible name', () => {
    render(<Button icon={<span data-testid="icon">★</span>}>Star</Button>);
    const btn = screen.getByRole('button', { name: /star/i });
    expect(btn).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    // Accessible name should be just "Star" because icon wrapper is aria-hidden
    expect(btn).toHaveAccessibleName('Star');
  });

  it('calls onClick when enabled (mouse)', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Hit</Button>);
    await user.click(screen.getByRole('button', { name: /hit/i }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('supports keyboard activation (Enter and Space)', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Key Me</Button>);
    const btn = screen.getByRole('button', { name: /key me/i });

    btn.focus();
    await user.keyboard('{Enter}');
    await user.keyboard(' '); // space
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button onClick={onClick} disabled>
        Disabled
      </Button>,
    );
    const btn = screen.getByRole('button', { name: /disabled/i });

    expect(btn).toBeDisabled();
    await user.click(btn);
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(onClick).not.toHaveBeenCalled();
  });

  it('forwards arbitrary props to the native button', () => {
    render(
      <Button aria-label="custom label" data-foo="bar">
        Label is overridden by aria-label
      </Button>,
    );
    const btn = screen.getByRole('button', { name: /custom label/i });
    expect(btn).toHaveAttribute('data-foo', 'bar');
  });

  it('defaults type to "button"', () => {
    render(<Button>Type</Button>);
    const btn = screen.getByRole('button', { name: /type/i });
    expect(btn).toHaveAttribute('type', 'button');
  });

  it('merges className with base styles and allows user overrides', () => {
    render(<Button className="hover:scale-125 rounded-none">Styled</Button>);
    const btn = screen.getByRole('button', { name: /styled/i });

    // User override present
    expect(btn.className).toMatch(/hover:scale-125/);
    expect(btn.className).toMatch(/rounded-none/);

    // Base spacing still present (merged, not replaced)
    expect(btn.className).toMatch(/px-5/);

    // Original hover scale removed by tailwind-merge in favor of user override
    expect(btn.className).not.toMatch(/hover:scale-110/);
  });
});
