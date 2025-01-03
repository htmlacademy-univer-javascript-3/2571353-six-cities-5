import { render, screen } from '@testing-library/react';
import {MemoryRouter, useLocation} from 'react-router-dom';
import { vi } from 'vitest';
import { Header } from './header';
import {Actions, AppRoute} from '../../utils/const';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {mockState} from '../../utils/mocks.ts';

vi.mock('../../store/hooks', () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual: object = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

describe('Component: Header', () => {
  const mockDispatch = vi.fn();
  const mockUseLocation = vi.fn();

  beforeEach(() => {
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useLocation).mockImplementation(mockUseLocation);
  });

  it('should render "Sign in" if user is not authorized', () => {
    // Мокаем селекторы для неавторизованного пользователя
    vi.mocked(useAppSelector).mockImplementation((selector) =>
      selector(mockState)
    );

    mockUseLocation.mockReturnValue({ pathname: AppRoute.Main });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
  });

  it('should render "Sign out" and user info if user is authorized', () => {
    const mockStateCopy = structuredClone(mockState);
    mockStateCopy[Actions.User].authorizationStatus = true;
    mockStateCopy[Actions.Favorites].favorites = [
      {
        id: '1',
        title: 'Nice apartment in Paris',
        type: 'apartment',
        price: 120,
        previewImage: '/img/apartment-01.jpg',
        city: {
          name: 'Paris',
          location: {
            latitude: 48.8566,
            longitude: 2.3522,
            zoom: 10,
          },
        },
        location: {
          latitude: 48.857,
          longitude: 2.354,
        },
        isFavorite: true,
        isPremium: false,
        rating: 4.5,
      },
      {
        id: '2',
        title: 'Beautiful house in Cologne',
        type: 'house',
        price: 200,
        previewImage: '/img/house-01.jpg',
        city: {
          name: 'Cologne',
          location: {
            latitude: 50.9375,
            longitude: 6.9603,
            zoom: 10,
          },
        },
        location: {
          latitude: 50.938,
          longitude: 6.962,
        },
        isFavorite: true,
        isPremium: true,
        rating: 4.8,
      },
    ];

    vi.mocked(useAppSelector).mockImplementation((selector) =>
      selector(mockStateCopy)
    );

    mockUseLocation.mockReturnValue({ pathname: AppRoute.Main });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // Количество избранных
  });

  it('should hide navigation on login page', () => {
    // Мокаем селекторы для авторизованного пользователя
    vi.mocked(useAppSelector).mockImplementation((selector) =>
      selector(mockState)
    );

    mockUseLocation.mockReturnValue({ pathname: AppRoute.Login });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
  });

  it('should call dispatch on logout', () => {
    const mockStateCopy = structuredClone(mockState);
    mockStateCopy[Actions.User].authorizationStatus = true;
    vi.mocked(useAppSelector).mockImplementation((selector) =>
      selector(mockStateCopy)
    );

    mockUseLocation.mockReturnValue({ pathname: AppRoute.Main });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logoutButton = screen.getByText('Sign out');
    logoutButton.click();

    expect(mockDispatch).toHaveBeenCalled();
  });
});
