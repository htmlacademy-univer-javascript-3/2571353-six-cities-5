import { render, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { PrivateRoute } from './PrivateRoute';
import { AppRoute, Actions } from './utils/const';
import { useAppSelector } from './store/hooks';
import {TRootReducer} from './store/rootReducer.ts';

vi.mock('./store/hooks', () => ({
  useAppSelector: vi.fn(),
}));

describe('Component: PrivateRoute', () => {
  it('should redirect to login if user is not authorized', () => {
    (useAppSelector as jest.Mock).mockImplementation((selector: (state: TRootReducer) => unknown) =>
      selector({
        [Actions.User]: { authorizationStatus: false },
      } as TRootReducer)
    );

    render(
      <MemoryRouter initialEntries={[AppRoute.Favorites]}>
        <Routes>
          <Route
            path={AppRoute.Login}
            element={<span>public route</span>}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <span>private route</span>
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('public route')).toBeInTheDocument();
    expect(screen.queryByText('private route')).not.toBeInTheDocument();
  });

  it('should render private content if user is authorized', () => {
    (useAppSelector as jest.Mock).mockImplementation((selector: (state: TRootReducer) => unknown) =>
      selector({
        [Actions.User]: { authorizationStatus: true },
      } as TRootReducer)
    );

    render(
      <MemoryRouter initialEntries={[AppRoute.Favorites]}>
        <Routes>
          <Route
            path={AppRoute.Login}
            element={<span>public route</span>}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <span>private route</span>
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('private route')).toBeInTheDocument();
    expect(screen.queryByText('public route')).not.toBeInTheDocument();
  });
});
