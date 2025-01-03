import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import {Actions, AppRoute, LoadingStatus} from './utils/const';
import {initAsyncActionsStore, mockState} from './utils/mocks.ts';

const {mockStoreCreator} = initAsyncActionsStore();

describe('App Routing', () => {
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator(mockState);
  });

  it('should render Main page for "/" route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Main]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  it('should render Login page for "/login" route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Login]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('should render Favorites page for "/favorites" route if authorized', () => {
    const mockStateCopy = structuredClone(mockState);

    mockStateCopy[Actions.User].authorizationStatus = true;
    mockStateCopy[Actions.Favorites].isFavoritesDataLoading = LoadingStatus.Init;

    render(
      <Provider store={mockStoreCreator(mockStateCopy)}>
        <MemoryRouter initialEntries={[AppRoute.Favorites]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render Offer page for "/offer/:id" route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Offer.replace(':id', '1')]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
  });

  it('should render NotFound page for unknown route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/unknown-route']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/404 Page not found/i)).toBeInTheDocument();
  });
});
