import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { ReviewsList } from './ReviewsList';
import { TReview } from '../../utils/types';

interface IReviewItemProps {
  review: TReview;
}

vi.mock('./ReviewItem', () => ({
  ReviewItem: ({ review }: IReviewItemProps) => (
    <li data-testid="review-item">
      {review.comment}
    </li>
  ),
}));

describe('ReviewsList', () => {
  const mockReviews: TReview[] = [
    {
      id: 1,
      date: '2023-10-12T14:48:00.000Z',
      user: {
        name: 'John Doe',
        avatarUrl: '/path/to/avatar.jpg',
        isPro: false,
      },
      comment: 'Great place to stay!',
      rating: 4.5,
    },
    {
      id: 2,
      date: '2023-10-13T14:48:00.000Z',
      user: {
        name: 'Jane Smith',
        avatarUrl: '/path/to/avatar2.jpg',
        isPro: true,
      },
      comment: 'Very cozy and clean!',
      rating: 5.0,
    },
  ];

  it('should render correctly with reviews', () => {
    render(<ReviewsList reviews={mockReviews} />);

    expect(screen.getByText('Reviews ·')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // Количество отзывов

    const reviewItems = screen.getAllByTestId('review-item');
    expect(reviewItems).toHaveLength(mockReviews.length);

    expect(screen.getByText('Great place to stay!')).toBeInTheDocument();
    expect(screen.getByText('Very cozy and clean!')).toBeInTheDocument();
  });

  it('should render correctly with no reviews', () => {
    render(<ReviewsList reviews={[]} />);

    expect(screen.getByText('Reviews ·')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();

    expect(screen.queryByTestId('review-item')).not.toBeInTheDocument();
  });
});
