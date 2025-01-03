import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {NotFound} from './NotFound';
import {AppRoute} from '../../utils/const';
import {Provider} from 'react-redux';
import {initAsyncActionsStore, mockState} from '../../utils/mocks.tsx';

const {mockStoreCreator} = initAsyncActionsStore();

describe('Component: NotFound', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStoreCreator(mockState)}>
        <MemoryRouter>
          <NotFound/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading', {name: '404 Page not found'})).toBeInTheDocument();

    const backLink = screen.getByRole('link', {name: 'Back to main page'});
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', AppRoute.Main);
  });
});
