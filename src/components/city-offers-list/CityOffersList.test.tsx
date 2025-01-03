import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom'; // Импортируем MemoryRouter
import { CityOffersList } from './CityOffersList';
import { useAppSelector } from '../../store/hooks.ts';

vi.mock('../../store/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('CityOffersList', () => {
  it('should render correctly with favorites', () => {
    const mockFavorites = [
      {
        id: '1',
        title: 'Nice Place in Paris',
        type: 'apartment',
        price: 120,
        city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522 } },
        location: { latitude: 48.8566, longitude: 2.3522 },
        isFavorite: true,
        isPremium: false,
        rating: 4.5,
        previewImage: 'img/apartment-01.jpg',
      },
      {
        id: '2',
        title: 'Cozy House in Cologne',
        type: 'house',
        price: 200,
        city: { name: 'Cologne', location: { latitude: 50.9375, longitude: 6.9603 } },
        location: { latitude: 50.9375, longitude: 6.9603 },
        isFavorite: true,
        isPremium: true,
        rating: 4.8,
        previewImage: 'img/house-01.jpg',
      },
      {
        id: '3',
        title: 'Modern Apartment in Paris',
        type: 'apartment',
        price: 150,
        city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522 } },
        location: { latitude: 48.8566, longitude: 2.3522 },
        isFavorite: true,
        isPremium: true,
        rating: 4.7,
        previewImage: 'img/apartment-02.jpg',
      },
    ];

    (useAppSelector as jest.Mock).mockReturnValue(mockFavorites);

    render(
      <MemoryRouter>
        <CityOffersList />
      </MemoryRouter>
    );

    const cityElements = screen.getAllByRole('listitem');
    expect(cityElements).toHaveLength(2); // Paris и Cologne

    const parisElement = screen.getByText('Paris');
    expect(parisElement).toBeInTheDocument();
    expect(screen.getAllByText(/Paris/i)).toHaveLength(3);

    const cologneElement = screen.getByText('Cologne');
    expect(cologneElement).toBeInTheDocument();
    expect(screen.getByText('Cozy House in Cologne')).toBeInTheDocument();
  });

  it('should render empty list if no favorites are available', () => {
    (useAppSelector as jest.Mock).mockReturnValue([]);

    render(
      <MemoryRouter>
        <CityOffersList />
      </MemoryRouter>
    );

    // Проверяем, что список пуст
    expect(screen.queryByRole('listitem')).toBeNull();
  });
});
