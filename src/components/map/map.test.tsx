import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Map } from './map';
import { useAppSelector } from '../../store/hooks';
import useMap from '../../hooks/use-map';
import { Marker, layerGroup } from 'leaflet';
import {TCity, TPlaceCard} from '../../utils/types.ts';

vi.mock('../../store/hooks', () => ({
  useAppSelector: vi.fn(),
}));

vi.mock('../../hooks/use-map', () => ({
  default: vi.fn(),
}));

vi.mock('leaflet', () => ({
  Icon: vi.fn(),
  Marker: vi.fn().mockImplementation(() => ({
    setIcon: vi.fn().mockReturnThis(),
    addTo: vi.fn(),
  })),
  layerGroup: vi.fn().mockImplementation(() => ({
    addTo: vi.fn(),
    remove: vi.fn(),
  })),
}));

describe('Component: Map', () => {
  const mockUseMap = vi.mocked(useMap);
  const mockUseAppSelector = vi.mocked(useAppSelector);

  beforeEach(() => {
    mockUseMap.mockReturnValue({
      on: vi.fn(),
      removeLayer: vi.fn(),
    } as never);

    mockUseAppSelector.mockReturnValue(undefined);
  });

  it('should render map container', () => {
    render(
      <Map
        city={{
          name: 'Paris',
          location: { latitude: 48.8566, longitude: 2.3522, zoom: 13 },
        }}
        places={[]}
      />
    );

    const mapContainer = screen.getByTestId('map-test');
    expect(mapContainer).toBeInTheDocument();
  });

  it('should create markers for places', () => {
    const mockCity: TCity = {
      name: 'Paris',
      location: { latitude: 48.8566, longitude: 2.3522, zoom: 13 },
    };

    const mockPlaces: TPlaceCard[] = [
      {
        id: '1',
        title: 'Place 1',
        type: 'apartment',
        price: 100,
        location: { latitude: 48.857, longitude: 2.354 },
        isFavorite: false,
        isPremium: true,
        rating: 4.5,
        city: mockCity,
      },
      {
        id: '2',
        title: 'Place 2',
        type: 'house',
        price: 200,
        location: { latitude: 48.858, longitude: 2.355 },
        isFavorite: true,
        isPremium: false,
        rating: 4.0,
        city: mockCity,
      },
    ];

    render(<Map city={mockCity} places={mockPlaces} />);

    expect(layerGroup).toHaveBeenCalled();
    expect(Marker).toHaveBeenCalledTimes(mockPlaces.length);
    expect(Marker).toHaveBeenCalledWith({
      lat: mockPlaces[0].location.latitude,
      lng: mockPlaces[0].location.longitude,
    });
    expect(Marker).toHaveBeenCalledWith({
      lat: mockPlaces[1].location.latitude,
      lng: mockPlaces[1].location.longitude,
    });
  });
});
