import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: '/' })
}));

const mockLogin = jest.fn();
jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin
  })
}));

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    mockLogin.mockClear();
    mockNavigate.mockClear();
  });

  test('renders login form correctly', () => {
    renderLogin();
    expect(screen.getByRole('heading', { name: /iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/usuario o correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ingresar/i })).toBeInTheDocument();
  });

  test('handles successful login', async () => {
    mockLogin.mockResolvedValue(true);
    renderLogin();

    const identifierInput = screen.getByLabelText(/usuario o correo/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const loginButton = screen.getByRole('button', { name: /ingresar/i });

    fireEvent.change(identifierInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  test('handles failed login', async () => {
    mockLogin.mockResolvedValue(false);
    renderLogin();

    const identifierInput = screen.getByLabelText(/usuario o correo/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const loginButton = screen.getByRole('button', { name: /ingresar/i });

    fireEvent.change(identifierInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/credenciales incorrectas/i, { exact: false })).toBeInTheDocument();
    });
  });
});