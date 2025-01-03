import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PlaceCard } from './PlaceCard';
import { PlaceClassTypes } from '../../utils/const';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {TPlaceCard} from '../../utils/types.ts';

vi.mock('../../store/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('../Rating/Rating', () => ({
  Rating: () => <div data-testid="rating" />,
}));

describe('PlaceCard', () => {
  const mockPlace: TPlaceCard = {
    id: '1',
    title: 'Beautiful place',
    type: 'apartment',
    price: 120,
    rating: 4.5,
    city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522 }},
    location: { latitude: 48.8566, longitude: 2.3522 },
    isFavorite: true,
    isPremium: true,
    previewImage: 'img1.jpg',
  };

  it('should render correctly with premium status', () => {
    const mockDispatch = vi.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue(true);

    render(
      <MemoryRouter>
        <PlaceCard
          place={mockPlace}
          placeCardType={PlaceClassTypes.Cities}
          onMouseOver={vi.fn()}
          onMouseLeave={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Premium')).toBeInTheDocument();

    expect(screen.getByText(/€120/i)).toBeInTheDocument();
    expect(screen.getByText('apartment')).toBeInTheDocument();

    expect(screen.getByText('Beautiful place')).toBeInTheDocument();

    const image = screen.getByAltText('Alt');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'img1.jpg');
    expect(image).toHaveAttribute('width', '260');
    expect(image).toHaveAttribute('height', '200');
  });

  it('should call onMouseOver and onMouseLeave correctly', () => {
    const onMouseOverMock = vi.fn();
    const onMouseLeaveMock = vi.fn();

    render(
      <MemoryRouter>
        <PlaceCard
          place={mockPlace}
          placeCardType={PlaceClassTypes.Cities}
          onMouseOver={onMouseOverMock}
          onMouseLeave={onMouseLeaveMock}
        />
      </MemoryRouter>
    );

    const card = screen.getByText('Beautiful place').closest('article');
    fireEvent.mouseOver(card!);
    fireEvent.mouseLeave(card!);

    expect(onMouseOverMock).toHaveBeenCalledTimes(1);
    expect(onMouseOverMock).toHaveBeenCalledWith(expect.anything());
    expect(onMouseLeaveMock).toHaveBeenCalledTimes(1);
    expect(onMouseLeaveMock).toHaveBeenCalledWith(expect.anything());
  });

  it('should not show bookmark button if user is not authorized', () => {
    (useAppSelector as jest.Mock).mockReturnValue(false);

    render(
      <MemoryRouter>
        <PlaceCard
          place={mockPlace}
          placeCardType={PlaceClassTypes.Cities}
        />
      </MemoryRouter>
    );

    expect(screen.queryByRole('button', { name: /To bookmarks/i })).not.toBeInTheDocument();
  });
});
