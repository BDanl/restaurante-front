import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Register from '../Register';

// Mock de useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: '/' })
}));

// Mock de useAuth
const mockRegister = jest.fn();
jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    register: mockRegister
  })
}));

const renderRegister = () => {
  return render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
};

describe('Register Component', () => {
  beforeEach(() => {
    mockRegister.mockClear();
    mockNavigate.mockClear();
  });

  test('renders register form correctly', () => {
    renderRegister();
    expect(screen.getByRole('heading', { name: /crear cuenta/i })).toBeInTheDocument();
    expect(screen.getByTestId('name-input')).toBeInTheDocument();
    expect(screen.getByTestId('username-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-password-input')).toBeInTheDocument();
    expect(screen.getByTestId('role-select')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrarse/i })).toBeInTheDocument();
  });

  test('handles successful registration', async () => {
    mockRegister.mockResolvedValue(true);
    const formData = {
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      role: 'waiter'
    };

    renderRegister();

    // Fill the form
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: formData.name } });
    fireEvent.change(screen.getByTestId('username-input'), { target: { value: formData.username } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: formData.email } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: formData.password } });
    fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: formData.confirmPassword } });
    fireEvent.change(screen.getByTestId('role-select'), { target: { value: formData.role } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    // Wait for registration to complete
    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        name: formData.name,
        username: formData.username.toLowerCase(),
        email: formData.email.toLowerCase(),
        password: formData.password,
        role: ''
      });
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  test('shows error when passwords do not match', async () => {
    mockRegister.mockResolvedValue(false);
    renderRegister();

    // Fill form with mismatched passwords
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: 'different123' } });
    fireEvent.change(screen.getByTestId('role-select'), { target: { value: 'waiter' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    // Check error message
    expect(screen.getByText(/las contraseñas no coinciden/i)).toBeInTheDocument();
  });

  test('shows error when registration fails', async () => {
    mockRegister.mockRejectedValue(new Error('Registration failed'));
    renderRegister();

    // Fill the form
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('role-select'), { target: { value: 'waiter' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    // Wait for error to be displayed
    await waitFor(() => {
      expect(screen.getByText('Registration failed')).toBeInTheDocument();
    });
  });

  test('disables form inputs during submission', async () => {
    mockRegister.mockResolvedValue(true);
    renderRegister();

    // Fill the form
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('role-select'), { target: { value: 'waiter' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    // Wait for inputs to be disabled
    await waitFor(() => {
      expect(screen.getByTestId('name-input')).toBeDisabled();
      expect(screen.getByTestId('username-input')).toBeDisabled();
      expect(screen.getByTestId('email-input')).toBeDisabled();
      expect(screen.getByTestId('password-input')).toBeDisabled();
      expect(screen.getByTestId('confirm-password-input')).toBeDisabled();
      expect(screen.getByTestId('role-select')).toBeDisabled();
    });
  });
});
