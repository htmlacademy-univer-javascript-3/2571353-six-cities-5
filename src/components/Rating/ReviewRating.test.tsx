import { render, screen } from '@testing-library/react';
import { ReviewRating } from './ReviewRating';
import { vi } from 'vitest';

describe('ReviewRating', () => {
  it('should render correctly with the given value', () => {
    const mockOnChange = vi.fn();

    render(<ReviewRating value={3} onChange={mockOnChange} />);

    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(5);

    const checkedRadioButtons = radioButtons.filter((radio) => (radio as HTMLInputElement).checked);
    expect(checkedRadioButtons).toHaveLength(1);
    expect(checkedRadioButtons[0]).toHaveAttribute('id', '3-stars');
  });
});
