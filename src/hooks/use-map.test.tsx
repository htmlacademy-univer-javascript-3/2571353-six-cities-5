import { renderHook, act } from '@testing-library/react-hooks';
import useMap from './use-map';
import { Map } from 'leaflet';
import { vi } from 'vitest';
import {TCity} from '../utils/types.ts';

// Типы для моков
interface MockMap extends Map {
  addLayer: jest.Mock;
  panTo: jest.Mock;
}

vi.mock('leaflet', () => ({
  Map: vi.fn().mockImplementation(() => ({
    addLayer: vi.fn(),
    panTo: vi.fn(),
  })),
  TileLayer: vi.fn().mockImplementation(() => ({})),
  LatLng: vi.fn()
}));

describe('useMap', () => {
  let mapRef: { current: HTMLDivElement | null };

  beforeEach(() => {
    mapRef = {
      current: document.createElement('div')
    };
  });

  it('should initialize the map on first render', () => {
    const city: TCity = {
      name: 'Paris',
      location: {
        latitude: 48.8566,
        longitude: 2.3522,
        zoom: 13
      }
    };

    const { result } = renderHook(() => useMap(mapRef, city));

    act(() => {
      mapRef.current?.dispatchEvent(new Event('load'));
    });

    expect(Map).toHaveBeenCalledWith(mapRef.current, {
      center: {
        lat: city.location.latitude,
        lng: city.location.longitude,
      },
      zoom: city.location.zoom
    });

    // Проверяем, что addLayer был вызван
    expect((result.current as MockMap).addLayer).toHaveBeenCalled();
  });
});
