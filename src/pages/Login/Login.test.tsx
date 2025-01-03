import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { Login } from './Login';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { userLogin } from '../../store/api-actions';
import { AppRoute } from '../../utils/const';

vi.mock('../../store/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('../../store/api-actions', () => ({
  userLogin: vi.fn(),
}));

describe('Component: Login', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
  });

  it('should render login form', () => {
    vi.mocked(useAppSelector).mockReturnValue(false);

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('should dispatch userLogin action on form submit', () => {
    vi.mocked(useAppSelector).mockReturnValue(false);

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign in' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(mockDispatch).toHaveBeenCalledWith(
      userLogin({ email: 'test@example.com', password: 'password123' })
    );
  });

  it('should redirect to main page if user is authorized', () => {
    vi.mocked(useAppSelector).mockReturnValue(true);

    render(
      <MemoryRouter initialEntries={[AppRoute.Login]}>
        <Login />
      </MemoryRouter>
    );

    expect(screen.queryByRole('heading', { name: 'Sign in' })).not.toBeInTheDocument();
  });
});
