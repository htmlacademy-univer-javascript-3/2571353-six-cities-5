import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { ReviewForm } from './ReviewForm';

type IReviewRatingProps = {
  onChange: (field: string, value: number) => void;
};

vi.mock('../Rating/ReviewRating', () => ({
  ReviewRating: ({ onChange }: IReviewRatingProps) => (
    <div data-testid="rating">
      <button onClick={() => onChange('rating', 5)}>Set Rating</button>
    </div>
  ),
}));

describe('ReviewForm', () => {
  it('should render correctly', () => {
    render(<ReviewForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell how was your stay/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeDisabled();
  });
});
