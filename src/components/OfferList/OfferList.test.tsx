import {MouseEventHandler} from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { OfferList } from './OfferList';
import { PlaceClassTypes } from '../../utils/const';
import {TPlaceCard} from '../../utils/types.ts';

interface IPlaceCardProps {
  place: TPlaceCard;
  onMouseOver?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
}

vi.mock('../PlaceCard/PlaceCard', () => ({
  PlaceCard: ({ place, onMouseOver, onMouseLeave }: IPlaceCardProps) => (
    <div
      data-testid="place-card"
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {place.title}
    </div>
  ),
}));

describe('OfferList', () => {
  const mockOffers: TPlaceCard[] = [
    {
      id: '1',
      title: 'Beautiful place',
      type: 'apartment',
      price: 120,
      rating: 4.5,
      city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522 } },
      location: { latitude: 48.8566, longitude: 2.3522 },
      isFavorite: true,
      isPremium: true,
      previewImage: 'img1.jpg',
    },
    {
      id: '2',
      title: 'Cozy studio',
      type: 'room',
      price: 80,
      rating: 4.0,
      city: { name: 'Cologne', location: { latitude: 48.8566, longitude: 2.3522 } },
      location: { latitude: 50.9375, longitude: 6.9603 },
      isFavorite: false,
      isPremium: false,
      previewImage: 'img2.jpg',
    },
  ];

  it('should render correctly with given offers', () => {
    const mockOnListItemHover = vi.fn();

    render(
      <OfferList
        offers={mockOffers}
        onListItemHover={mockOnListItemHover}
        listType={PlaceClassTypes.Cities}
      />
    );

    const placeCards = screen.getAllByTestId('place-card');
    expect(placeCards).toHaveLength(mockOffers.length);

    expect(screen.getByText('Beautiful place')).toBeInTheDocument();
    expect(screen.getByText('Cozy studio')).toBeInTheDocument();

    const container = screen.getByTestId('offer-list-container');
    expect(container).toHaveClass('cities__places-list places__list tabs__content');
  });

  it('should call onListItemHover on mouse events', () => {
    const mockOnListItemHover = vi.fn();

    render(
      <OfferList
        offers={mockOffers}
        onListItemHover={mockOnListItemHover}
        listType={PlaceClassTypes.Cities}
      />
    );

    const firstPlaceCard = screen.getByText('Beautiful place');
    fireEvent.mouseOver(firstPlaceCard);
    expect(mockOnListItemHover).toHaveBeenCalledWith('1');

    fireEvent.mouseLeave(firstPlaceCard);
    expect(mockOnListItemHover).toHaveBeenCalledWith(undefined);
  });

  it('should render correctly with NearPlaces type', () => {
    const mockOnListItemHover = vi.fn();

    render(
      <OfferList
        offers={mockOffers}
        onListItemHover={mockOnListItemHover}
        listType={PlaceClassTypes.NearPlaces}
      />
    );

    const container = screen.getByTestId('offer-list-container');
    expect(container).toHaveClass('near-places__list places__list');
    expect(container).not.toHaveClass('tabs__content');
  });
});
