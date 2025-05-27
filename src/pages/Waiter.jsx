import React, { useState, useEffect } from "react";
import { useMenu } from "../context/MenuContext";
import { useAuth } from "../context/AuthContext";
import "../styles/waiter.css";

const Waiter = () => {
  const { dishes } = useMenu();
  const { users } = useAuth();
  const [activeSection, setActiveSection] = useState("customers");

  // Estado para clientes
  const [customers, setCustomers] = useState([
    { id: 1, name: "Juan Pérez", phone: "555-1234", table: null },
    { id: 2, name: "María García", phone: "555-5678", table: 2 },
  ]);

  // Estado para nuevo cliente
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
  });

  // Estado para mesas
  const [tables, setTables] = useState([
    { id: 1, number: "Mesa 1", status: "disponible" },
    { id: 2, number: "Mesa 2", status: "ocupada" },
    { id: 3, number: "Mesa 3", status: "disponible" },
    { id: 4, number: "Mesa 4", status: "disponible" },
  ]);

  // Estado para pedidos
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "María García",
      table: 2,
      waiter: "Ana Martínez",
      items: [
        { id: 201, name: "Spaghetti Carbonara", price: 14.5, quantity: 1 },
        { id: 105, name: "Ensalada Waldorf", price: 18.75, quantity: 2 },
      ],
      paymentMethod: "Tarjeta de Crédito",
      status: "en preparación",
      total: 52.0,
      date: "15/05/2023 14:30",
    },
  ]);

  // Estado para nuevo pedido
  const [newOrder, setNewOrder] = useState({
    customer: "",
    table: "",
    waiter: "",
    paymentMethod: "",
    items: [],
    status: "pendiente",
  });

  // Filtrar meseros
  const waiters = users.filter((user) => user.role === "waiter");

  // Métodos de pago
  const paymentMethods = [
    "Efectivo",
    "Tarjeta de Crédito",
    "Tarjeta de Débito",
    "Transferencia Bancaria",
  ];

  // Agregar nuevo cliente y asignar a mesa
  const addCustomerToTable = (tableId) => {
    if (!newCustomer.name.trim()) {
      alert("Por favor ingrese el nombre del cliente");
      return;
    }

    const customerToAdd = {
      id: Date.now(),
      name: newCustomer.name,
      phone: newCustomer.phone,
      table: tableId,
    };

    setCustomers([...customers, customerToAdd]);
    setTables(
      tables.map((table) =>
        table.id === tableId ? { ...table, status: "ocupada" } : table
      )
    );
    setNewCustomer({ name: "", phone: "" });
  };

  // Liberar mesa
  const freeTable = (tableId) => {
    setCustomers(customers.filter((customer) => customer.table !== tableId));
    setTables(
      tables.map((table) =>
        table.id === tableId ? { ...table, status: "disponible" } : table
      )
    );
  };

  // Funciones para gestión de pedidos
  const addDishToOrder = (dish) => {
    const existingItem = newOrder.items.find((item) => item.id === dish.id);

    if (existingItem) {
      setNewOrder({
        ...newOrder,
        items: newOrder.items.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      });
    } else {
      setNewOrder({
        ...newOrder,
        items: [...newOrder.items, { ...dish, quantity: 1 }],
      });
    }
  };

  const updateDishQuantity = (dishId, quantity) => {
    if (quantity <= 0) {
      setNewOrder({
        ...newOrder,
        items: newOrder.items.filter((item) => item.id !== dishId),
      });
    } else {
      setNewOrder({
        ...newOrder,
        items: newOrder.items.map((item) =>
          item.id === dishId ? { ...item, quantity } : item
        ),
      });
    }
  };

  const calculateTotal = () => {
    return newOrder.items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(3);
  };

  const registerOrder = () => {
    if (
      !newOrder.customer ||
      !newOrder.table ||
      !newOrder.waiter ||
      newOrder.items.length === 0
    ) {
      alert("Complete todos los campos y agregue platillos");
      return;
    }

    const orderToAdd = {
      ...newOrder,
      id: Date.now(),
      date: new Date().toLocaleString(),
      total: calculateTotal(),
      status: "pendiente",
    };

    setOrders([...orders, orderToAdd]);
    setNewOrder({
      customer: "",
      table: "",
      waiter: "",
      paymentMethod: "",
      items: [],
      status: "pendiente",
    });

    alert("Pedido registrado exitosamente");
  };

  // Estado para edición de pedido
  const [editingOrder, setEditingOrder] = useState(null);

  // Función para eliminar pedido
  const deleteOrder = (orderId) => {
    if (window.confirm("¿Está seguro que desea eliminar este pedido?")) {
      setOrders(orders.filter((order) => order.id !== orderId));
    }
  };

  // Función para iniciar edición
  const startEditing = (order) => {
    setEditingOrder({ ...order });
  };

  // Función para cancelar edición
  const cancelEditing = () => {
    setEditingOrder(null);
  };

  // Función para guardar cambios
  const saveEditedOrder = () => {
    if (
      !editingOrder.customer ||
      !editingOrder.table ||
      !editingOrder.waiter ||
      editingOrder.items.length === 0
    ) {
      alert(
        "Complete todos los campos y asegúrese de tener al menos un platillo"
      );
      return;
    }

    setOrders(
      orders.map((order) =>
        order.id === editingOrder.id ? editingOrder : order
      )
    );
    setEditingOrder(null);
    alert("Pedido actualizado correctamente");
  };

  // Función para actualizar items en pedido editado
  const updateEditedDishQuantity = (dishId, quantity) => {
    if (quantity <= 0) {
      setEditingOrder({
        ...editingOrder,
        items: editingOrder.items.filter((item) => item.id !== dishId),
      });
    } else {
      setEditingOrder({
        ...editingOrder,
        items: editingOrder.items.map((item) =>
          item.id === dishId ? { ...item, quantity } : item
        ),
      });
    }
  };

  // Renderizar sección de gestión de clientes
  const renderCustomerManagement = () => (
    <div className="section-container">
      <h2>Gestión de Clientes</h2>
      <div className="tables-grid">
        {tables.map((table) => (
          <div key={table.id} className={`table-card ${table.status}`}>
            <h3>{table.number}</h3>
            <p>Estado: {table.status}</p>

            {table.status === "ocupada" ? (
              <div className="customer-info">
                <p>
                  <strong>Cliente:</strong>{" "}
                  {customers.find((c) => c.table === table.id)?.name ||
                    "Sin asignar"}
                </p>
                <button
                  onClick={() => freeTable(table.id)}
                  className="action-button danger"
                >
                  Liberar Mesa
                </button>
              </div>
            ) : (
              <div className="assign-customer">
                <input
                  type="text"
                  placeholder="Nombre del cliente"
                  value={newCustomer.name}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Teléfono (opcional)"
                  value={newCustomer.phone}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, phone: e.target.value })
                  }
                />
                <button
                  onClick={() => addCustomerToTable(table.id)}
                  className="action-button"
                >
                  Asignar a Mesa
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Renderizar sección de gestión de pedidos
  const renderOrderManagement = () => (
    <div className="section-container">
      <h2>Registrar Nuevo Pedido</h2>
      <div className="order-form">
        <div className="form-section">
          <h3>Información del Pedido</h3>

          <div className="form-group">
            <label>Cliente:</label>
            <select
              value={newOrder.customer}
              onChange={(e) =>
                setNewOrder({ ...newOrder, customer: e.target.value })
              }
              required
            >
              <option value="">Seleccione un cliente</option>
              {customers
                .filter((c) => c.table)
                .map((customer) => (
                  <option key={customer.id} value={customer.name}>
                    {customer.name} (Mesa {customer.table})
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label>Mesa:</label>
            <select
              value={newOrder.table}
              onChange={(e) =>
                setNewOrder({ ...newOrder, table: e.target.value })
              }
              required
            >
              <option value="">Seleccione una mesa</option>
              {tables
                .filter((table) => table.status === "ocupada")
                .map((table) => (
                  <option key={table.id} value={table.id}>
                    {table.number}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label>Mesero:</label>
            <select
              value={newOrder.waiter}
              onChange={(e) =>
                setNewOrder({ ...newOrder, waiter: e.target.value })
              }
              required
            >
              <option value="">Seleccione un mesero</option>
              {waiters.map((waiter) => (
                <option key={waiter.id} value={waiter.name}>
                  {waiter.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-section">
          <h3>Método de Pago</h3>
          <div className="payment-methods">
            {paymentMethods.map((method) => (
              <label key={method} className="payment-method">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={newOrder.paymentMethod === method}
                  onChange={() =>
                    setNewOrder({ ...newOrder, paymentMethod: method })
                  }
                />
                {method}
              </label>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h3>Menú Disponible</h3>
          <div className="dishes-grid">
            {dishes
              .filter((dish) => dish.available)
              .map((dish) => (
                <div key={dish.id} className="dish-card">
                  <h4>{dish.name}</h4>
                  <p>{dish.description}</p>
                  <p className="price">${dish.price.toFixed(3)}</p>
                  <div className="dish-actions">
                    <button
                      onClick={() => addDishToOrder(dish)}
                      className="add-button"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="form-section">
          <h3>Resumen del Pedido</h3>
          {newOrder.items.length === 0 ? (
            <p className="no-items-message">No hay platillos en el pedido</p>
          ) : (
            <div className="order-summary-container">
              <div className="order-summary-header">
                <span className="header-item">Platillo</span>
                <span className="header-quantity">Cantidad</span>
                <span className="header-price">P. Unitario</span>
                <span className="header-subtotal">Subtotal</span>
              </div>

              <div className="order-summary-items">
                {newOrder.items.map((item) => (
                  <div key={item.id} className="order-summary-item">
                    <span className="item-name">{item.name}</span>
                    <div className="item-quantity">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateDishQuantity(item.id, parseInt(e.target.value))
                        }
                        className="quantity-input"
                      />
                      <button
                        onClick={() => removeDishFromOrder(item.id)}
                        className="remove-item-button"
                        title="Eliminar platillo"
                      >
                        ×
                      </button>
                    </div>
                    <span className="item-price">${item.price.toFixed(3)}</span>
                    <span className="item-subtotal">
                      ${(item.price * item.quantity).toFixed(3)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="order-summary-total">
                <span>Total:</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
          )}
        </div>

        <button onClick={registerOrder} className="register-button">
          Registrar Pedido
        </button>
      </div>
    </div>
  );

  // Función para renderizar el select de meseros (reutilizable)
  const renderWaitersSelect = (value, onChange) => (
    <select value={value} onChange={onChange} className="form-select" required>
      <option value="">Seleccione un mesero</option>
      {waiters.map((waiter) => (
        <option key={waiter.id} value={waiter.name}>
          {waiter.name} ({waiter.email})
        </option>
      ))}
    </select>
  );

  // Renderizar sección de ver pedidos
  const renderViewOrders = () => (
    <div className="section-container">
      <h2>Estado de Pedidos</h2>
      <div className="orders-grid">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`order-card ${order.status.replace(/\s+/g, "-")}`}
          >
            {editingOrder?.id === order.id ? (
              <div className="edit-order-form">
                <h3>Editando Pedido #{order.id}</h3>

                <div className="form-group">
                  <label>Cliente:</label>
                  <select
                    value={editingOrder.customer}
                    onChange={(e) =>
                      setEditingOrder({
                        ...editingOrder,
                        customer: e.target.value,
                      })
                    }
                  >
                    {customers
                      .filter((c) => c.table)
                      .map((customer) => (
                        <option key={customer.id} value={customer.name}>
                          {customer.name} (Mesa {customer.table})
                        </option>
                      ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Mesa:</label>
                  <select
                    value={editingOrder.table}
                    onChange={(e) =>
                      setEditingOrder({
                        ...editingOrder,
                        table: e.target.value,
                      })
                    }
                  >
                    {tables
                      .filter((table) => table.status === "ocupada")
                      .map((table) => (
                        <option key={table.id} value={table.id}>
                          {table.number}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Mesero:</label>
                  {renderWaitersSelect(editingOrder.waiter, (e) =>
                    setEditingOrder({ ...editingOrder, waiter: e.target.value })
                  )}
                </div>

                <div className="form-group">
                  <label>Estado:</label>
                  <select
                    value={editingOrder.status}
                    onChange={(e) =>
                      setEditingOrder({
                        ...editingOrder,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="en preparación">En preparación</option>
                    <option value="terminado">Terminado</option>
                    <option value="entregado">Entregado</option>
                  </select>
                </div>

                <div className="order-items-edit">
                  <h4>Items:</h4>
                  {editingOrder.items.map((item, index) => (
                    <div key={index} className="edit-item">
                      <span>{item.name}</span>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateEditedDishQuantity(
                            item.id,
                            parseInt(e.target.value)
                          )
                        }
                      />
                      <span>${item.price.toFixed(3)} c/u</span>
                      <span>
                        Total: ${(item.price * item.quantity).toFixed(3)}
                      </span>
                      <button
                        onClick={() => removeDishFromEditedOrder(item.id)}
                        className="remove-item-button"
                        title="Eliminar platillo"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="edit-actions">
                  <button
                    onClick={saveEditedOrder}
                    className="action-button success"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="action-button secondary"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="order-header">
                  <h3>Pedido #{order.id}</h3>
                  <span className="order-status">{order.status}</span>
                </div>
                <div className="order-details">
                  <p>
                    <strong>Mesa:</strong> {order.table}
                  </p>
                  <p>
                    <strong>Cliente:</strong> {order.customer}
                  </p>
                  <p>
                    <strong>Mesero:</strong> {order.waiter}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {order.date}
                  </p>
                </div>
                <div className="order-items">
                  <h4>Items:</h4>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.quantity}x {item.name} (${item.price.toFixed(3)}{" "}
                        c/u)
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="order-footer">
                  <p>
                    <strong>Total:</strong> ${order.total}
                  </p>
                  <p>
                    <strong>Pago:</strong> {order.paymentMethod}
                  </p>
                </div>
                <div className="order-actions">
                  <button
                    onClick={() => startEditing(order)}
                    className="action-button"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="action-button danger"
                  >
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const removeDishFromOrder = (dishId) => {
    setNewOrder({
      ...newOrder,
      items: newOrder.items.filter((item) => item.id !== dishId),
    });
  };

  // Función para eliminar platillo del pedido en edición
  const removeDishFromEditedOrder = (dishId) => {
    setEditingOrder({
      ...editingOrder,
      items: editingOrder.items.filter((item) => item.id !== dishId),
    });
  };

  return (
    <div className="waiter-container">
      <h1>Panel de Mesero</h1>

      <div className="waiter-nav">
        <button
          className={activeSection === "customers" ? "active" : ""}
          onClick={() => setActiveSection("customers")}
        >
          Gestión de Clientes
        </button>
        <button
          className={activeSection === "orders" ? "active" : ""}
          onClick={() => setActiveSection("orders")}
        >
          Gestión de Pedidos
        </button>
        <button
          className={activeSection === "view-orders" ? "active" : ""}
          onClick={() => setActiveSection("view-orders")}
        >
          Ver Pedidos
        </button>
      </div>

      {activeSection === "customers" && renderCustomerManagement()}
      {activeSection === "orders" && renderOrderManagement()}
      {activeSection === "view-orders" && renderViewOrders()}
    </div>
  );
};

export default Waiter;
