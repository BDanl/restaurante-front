import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Waiter from '../Waiter';

// Mock window.alert
window.alert = jest.fn();

// Mock context providers
jest.mock('../../context/MenuContext', () => ({
  useMenu: () => ({
    dishes: [
      {
        id: 1,
        name: 'Pizza Margherita',
        description: 'Pizza con mozzarella y tomate',
        price: 12.5,
        available: true
      },
      {
        id: 2,
        name: 'Spaghetti Carbonara',
        description: 'Pasta con salsa de queso y panceta',
        price: 14.5,
        available: true
      }
    ]
  })
}));

jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    users: [
      {
        id: 1,
        name: 'Ana Martínez',
        role: 'waiter'
      },
      {
        id: 2,
        name: 'Carlos García',
        role: 'waiter'
      }
    ]
  })
}));

describe('Waiter Component', () => {
  const renderWaiter = () => {
    return render(
      <BrowserRouter>
        <Waiter />
      </BrowserRouter>
    );
  };

  test('renders customer management section', () => {
    renderWaiter();
    
    // Check navigation button
    const customerManagementButton = screen.getByRole('button', { name: /gestión de clientes/i });
    expect(customerManagementButton).toBeInTheDocument();
    expect(customerManagementButton).toHaveClass('active');

    // Check table cards
    const tableCards = screen.getAllByRole('heading', { level: 3 });
    expect(tableCards).toHaveLength(4);
    expect(screen.getByText('Mesa 1')).toBeInTheDocument();
    expect(screen.getByText('Mesa 2')).toBeInTheDocument();
    expect(screen.getByText('Mesa 3')).toBeInTheDocument();
    expect(screen.getByText('Mesa 4')).toBeInTheDocument();
  });

  test('renders order management section', () => {
    renderWaiter();
    
    // Switch to order management section
    const orderManagementButton = screen.getByRole('button', { name: /gestión de pedidos/i });
    fireEvent.click(orderManagementButton);

    // Check section heading
    expect(screen.getByText('Registrar Nuevo Pedido')).toBeInTheDocument();
    
    // Check form sections
    expect(screen.getByText('Información del Pedido')).toBeInTheDocument();
    expect(screen.getByText('Método de Pago')).toBeInTheDocument();
    expect(screen.getByText('Menú Disponible')).toBeInTheDocument();
  });

  test('handles customer assignment to table', async () => {
    renderWaiter();

    // Find an available table
    const tableCard = screen.getByText('Mesa 1').closest('.table-card');
    expect(tableCard).toHaveClass('disponible');

    // Fill customer form
    const nameInput = screen.getAllByPlaceholderText('Nombre del cliente')[0];
    fireEvent.change(nameInput, {
      target: { value: 'Juan Pérez' }
    });
    const phoneInput = screen.getAllByPlaceholderText('Teléfono (opcional)')[0];
    fireEvent.change(phoneInput, {
      target: { value: '555-1234' }
    });

    // Click assign button
    const assignButton = screen.getAllByText('Asignar a Mesa')[0];
    fireEvent.click(assignButton);

    // Wait for table status to change
    await waitFor(() => {
      expect(tableCard).toHaveClass('ocupada');
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    });
  });

  test('handles order registration', async () => {
    renderWaiter();

    // Switch to order management section
    const orderManagementButton = screen.getByRole('button', { name: /gestión de pedidos/i });
    fireEvent.click(orderManagementButton);

    // Wait for form to be rendered
    await waitFor(() => {
      expect(screen.getByText('Información del Pedido')).toBeInTheDocument();
    });

    // Select customer
    const customerSelect = screen.getAllByRole('combobox')[0];
    fireEvent.change(customerSelect, {
      target: { value: 'María García' }
    });

    // Select table
    const tableSelect = screen.getAllByRole('combobox')[1];
    fireEvent.change(tableSelect, {
      target: { value: '2' }
    });

    // Select waiter
    const waiterSelect = screen.getAllByRole('combobox')[2];
    fireEvent.change(waiterSelect, {
      target: { value: 'Ana Martínez' }
    });

    // Select payment method
    const paymentMethod = screen.getByRole('radio', { name: /efectivo/i });
    fireEvent.click(paymentMethod);

    // Add dish to order
    const addButtons = screen.getAllByText('Agregar', { selector: '.add-button' });
    fireEvent.click(addButtons[0]);

    // Register order
    const registerButton = screen.getByRole('button', { name: /registrar pedido/i });
    fireEvent.click(registerButton);

    // Wait for success message
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Pedido registrado exitosamente');
    });
  });

  test('handles order editing', async () => {
    renderWaiter();

    // Switch to view orders section
    const viewOrdersButton = screen.getByRole('button', { name: /ver pedidos/i });
    fireEvent.click(viewOrdersButton);

    // Wait for orders to be rendered
    await waitFor(() => {
      expect(screen.getByText('Estado de Pedidos')).toBeInTheDocument();
    });

    // Start editing an order
    const editButtons = screen.getAllByRole('button', { name: /editar/i });
    fireEvent.click(editButtons[0]);

    // Wait for edit form to be rendered
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /editando pedido/i })).toBeInTheDocument();
    });

    // Update dish quantity
    const quantityInputs = screen.getAllByRole('spinbutton'); // Input type="number" is a spinbutton
    fireEvent.change(quantityInputs[0], { target: { value: 2 } });

    // Save changes
    const saveButton = screen.getByRole('button', { name: 'Guardar' });
    fireEvent.click(saveButton);

    // Wait for success message
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Pedido actualizado correctamente');
    });
  });

  test('handles table liberation', async () => {
    renderWaiter();

    // Find occupied table
    const tableCard = screen.getByText('Mesa 2').closest('.table-card');
    expect(tableCard).toHaveClass('ocupada');

    // Click liberate table button
    const freeTableButton = screen.getByText('Liberar Mesa');
    fireEvent.click(freeTableButton);

    // Wait for table status to change
    await waitFor(() => {
      expect(tableCard).toHaveClass('disponible');
    });
  });
});