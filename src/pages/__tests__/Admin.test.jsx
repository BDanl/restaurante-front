import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Admin from '../Admin';

jest.mock('../../components/admin/sections/OrdersSection', () => () => <div data-testid="orders-section">Orders Section</div>);
jest.mock('../../components/admin/sections/UsersSection', () => () => <div data-testid="users-section">Users Section</div>);
jest.mock('../../components/admin/sections/MenuSection', () => () => <div data-testid="menu-section">Menu Section</div>);
jest.mock('../../components/admin/sections/ReportsSection', () => () => <div data-testid="reports-section">Reports Section</div>);
jest.mock('../../components/admin/sections/DishesSection', () => () => <div data-testid="dishes-section">Dishes Section</div>);
jest.mock('../../components/admin/sections/TablesSection', () => () => <div data-testid="tables-section">Tables Section</div>);

jest.mock('../../context/MenuContext', () => ({
  MenuProvider: ({ children }) => children,
}));

describe('Admin Component', () => {
  const renderAdmin = () => {
    return render(
      <BrowserRouter>
        <Admin />
      </BrowserRouter>
    );
  };

  test('renders admin panel with initial state', () => {
    renderAdmin();

    expect(screen.getByText('Panel de Administración')).toBeInTheDocument();

    expect(screen.getByText('Órdenes y Pagos')).toBeInTheDocument();
    expect(screen.getByText('Gestión de Usuarios')).toBeInTheDocument();
    expect(screen.getByText('Gestión del Menú')).toBeInTheDocument();
    expect(screen.getByText('Reportes de Ingredientes')).toBeInTheDocument();
    expect(screen.getByText('Gestión de Platos')).toBeInTheDocument();
    expect(screen.getByText('Gestión de Mesas')).toBeInTheDocument();

    expect(screen.getByTestId('orders-section')).toBeInTheDocument();
    expect(screen.queryByTestId('users-section')).not.toBeInTheDocument();
    expect(screen.queryByTestId('menu-section')).not.toBeInTheDocument();
    expect(screen.queryByTestId('reports-section')).not.toBeInTheDocument();
    expect(screen.queryByTestId('dishes-section')).not.toBeInTheDocument();
    expect(screen.queryByTestId('tables-section')).not.toBeInTheDocument();
  });

  test('navigates between sections', () => {
    renderAdmin();

    fireEvent.click(screen.getByText('Gestión de Usuarios'));
    expect(screen.getByTestId('users-section')).toBeInTheDocument();
    expect(screen.queryByTestId('orders-section')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Gestión del Menú'));
    expect(screen.getByTestId('menu-section')).toBeInTheDocument();
    expect(screen.queryByTestId('users-section')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Reportes de Ingredientes'));
    expect(screen.getByTestId('reports-section')).toBeInTheDocument();
    expect(screen.queryByTestId('menu-section')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Gestión de Platos'));
    expect(screen.getByTestId('dishes-section')).toBeInTheDocument();
    expect(screen.queryByTestId('reports-section')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Gestión de Mesas'));
    expect(screen.getByTestId('tables-section')).toBeInTheDocument();
    expect(screen.queryByTestId('dishes-section')).not.toBeInTheDocument();
  });

  test('highlights active section', () => {
    renderAdmin();

    expect(screen.getByText('Órdenes y Pagos')).not.toHaveClass('secondary');
    expect(screen.getByText('Gestión de Usuarios')).toHaveClass('secondary');

    fireEvent.click(screen.getByText('Gestión de Usuarios'));
    expect(screen.getByText('Órdenes y Pagos')).toHaveClass('secondary');
    expect(screen.getByText('Gestión de Usuarios')).not.toHaveClass('secondary');

    fireEvent.click(screen.getByText('Gestión del Menú'));
    expect(screen.getByText('Gestión de Usuarios')).toHaveClass('secondary');
    expect(screen.getByText('Gestión del Menú')).not.toHaveClass('secondary');
  });

  test('renders sections correctly', () => {
    renderAdmin();

    fireEvent.click(screen.getByText('Órdenes y Pagos'));
    expect(screen.getByTestId('orders-section')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Gestión de Usuarios'));
    expect(screen.getByTestId('users-section')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Gestión del Menú'));
    expect(screen.getByTestId('menu-section')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Reportes de Ingredientes'));
    expect(screen.getByTestId('reports-section')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Gestión de Platos'));
    expect(screen.getByTestId('dishes-section')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Gestión de Mesas'));
    expect(screen.getByTestId('tables-section')).toBeInTheDocument();
  });
});
