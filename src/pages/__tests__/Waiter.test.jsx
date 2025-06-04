import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Waiter from '../Waiter';

window.alert = jest.fn();

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
    
    const orderManagementButton = screen.getByRole('button', { name: /gestión de pedidos/i });
    fireEvent.click(orderManagementButton);

    expect(screen.getByText('Registrar Nuevo Pedido')).toBeInTheDocument();
    
    expect(screen.getByText('Información del Pedido')).toBeInTheDocument();
    expect(screen.getByText('Método de Pago')).toBeInTheDocument();
    expect(screen.getByText('Menú Disponible')).toBeInTheDocument();
  });

  test('handles customer assignment to table', async () => {
    renderWaiter();

    const tableCard = screen.getByText('Mesa 1').closest('.table-card');
    expect(tableCard).toHaveClass('disponible');

    const nameInput = screen.getAllByPlaceholderText('Nombre del cliente')[0];
    fireEvent.change(nameInput, {
      target: { value: 'Juan Pérez' }
    });
    const phoneInput = screen.getAllByPlaceholderText('Teléfono (opcional)')[0];
    fireEvent.change(phoneInput, {
      target: { value: '555-1234' }
    });

    const assignButton = screen.getAllByText('Asignar a Mesa')[0];
    fireEvent.click(assignButton);

    await waitFor(() => {
      expect(tableCard).toHaveClass('ocupada');
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    });
  });

  test('handles order registration', async () => {
    renderWaiter();

    const orderManagementButton = screen.getByRole('button', { name: /gestión de pedidos/i });
    fireEvent.click(orderManagementButton);

    await waitFor(() => {
      expect(screen.getByText('Información del Pedido')).toBeInTheDocument();
    });

    const customerSelect = screen.getAllByRole('combobox')[0];
    fireEvent.change(customerSelect, {
      target: { value: 'María García' }
    });

    const tableSelect = screen.getAllByRole('combobox')[1];
    fireEvent.change(tableSelect, {
      target: { value: '2' }
    });

    const waiterSelect = screen.getAllByRole('combobox')[2];
    fireEvent.change(waiterSelect, {
      target: { value: 'Ana Martínez' }
    });

    const paymentMethod = screen.getByRole('radio', { name: /efectivo/i });
    fireEvent.click(paymentMethod);

    const addButtons = screen.getAllByText('Agregar', { selector: '.add-button' });
    fireEvent.click(addButtons[0]);

    const registerButton = screen.getByRole('button', { name: /registrar pedido/i });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Pedido registrado exitosamente');
    });
  });

  test('handles order editing', async () => {
    renderWaiter();

    const viewOrdersButton = screen.getByRole('button', { name: /ver pedidos/i });
    fireEvent.click(viewOrdersButton);

    await waitFor(() => {
      expect(screen.getByText('Estado de Pedidos')).toBeInTheDocument();
    });

    const editButtons = screen.getAllByRole('button', { name: /editar/i });
    fireEvent.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /editando pedido/i })).toBeInTheDocument();
    });

    const quantityInputs = screen.getAllByRole('spinbutton'); 
    fireEvent.change(quantityInputs[0], { target: { value: 2 } });

    const saveButton = screen.getByRole('button', { name: 'Guardar' });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Pedido actualizado correctamente');
    });
  });

  test('handles table liberation', async () => {
    renderWaiter();

    const tableCard = screen.getByText('Mesa 2').closest('.table-card');
    expect(tableCard).toHaveClass('ocupada');

    const freeTableButton = screen.getByText('Liberar Mesa');
    fireEvent.click(freeTableButton);

    await waitFor(() => {
      expect(tableCard).toHaveClass('disponible');
    });
  });
});