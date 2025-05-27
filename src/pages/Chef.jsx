import React, { useState, useEffect } from 'react';
import '../styles/chef.css';

const Chef = () => {
  // Estado para los pedidos (simulando conexión con backend)
  const [orders, setOrders] = useState([
    {
      id: 1,
      table: 5,
      customer: 'Juan Pérez',
      items: ['Pasta Alfredo', 'Ensalada César'],
      status: 'pendiente',
      time: '12:45 PM',
      notes: 'Sin picante'
    },
    {
      id: 2,
      table: 3,
      customer: 'María García',
      items: ['Filete Mignon', 'Papas Fritas', 'Refresco'],
      status: 'en preparación',
      time: '12:30 PM',
      notes: ''
    },
    {
      id: 3,
      table: 8,
      customer: 'Carlos López',
      items: ['Sopa del día', 'Sandwich'],
      status: 'pendiente',
      time: '1:15 PM',
      notes: 'Sandwich sin mayonesa'
    }
  ]);

  // Estados para filtros
  const [statusFilter, setStatusFilter] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Función para cambiar estado del pedido
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    // Aquí iría la conexión con el backend para actualizar en tiempo real
  };

  // Filtrar pedidos según selección
  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'todos' || order.status === statusFilter;
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.table.toString().includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  // Simular actualización en tiempo real (en una app real usarías websockets)
  useEffect(() => {
    const interval = setInterval(() => {
      // Aquí iría la lógica para recibir actualizaciones del backend
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chef-container">
      <h1>Panel del Chef</h1>
      
      <div className="orders-section">
        <h2>Pedidos Asignados</h2>
        
        <div className="filters-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Buscar por numero de mesa o cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="status-filters">
            <button
              className={`filter-btn ${statusFilter === 'todos' ? 'active' : ''}`}
              onClick={() => setStatusFilter('todos')}
            >
              Todos
            </button>
            <button
              className={`filter-btn ${statusFilter === 'pendiente' ? 'active' : ''}`}
              onClick={() => setStatusFilter('pendiente')}
            >
              Pendientes
            </button>
            <button
              className={`filter-btn ${statusFilter === 'en preparación' ? 'active' : ''}`}
              onClick={() => setStatusFilter('en preparación')}
            >
              En preparación
            </button>
            <button
              className={`filter-btn ${statusFilter === 'listo' ? 'active' : ''}`}
              onClick={() => setStatusFilter('listo')}
            >
              Listos
            </button>
          </div>
        </div>
        
        <div className="orders-grid">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <div key={order.id} className={`order-card ${order.status.replace(/\s+/g, '-')}`}>
                <div className="order-header">
                  <h3>Mesa {order.table}</h3>
                  <span className="order-time">{order.time}</span>
                </div>
                
                <div className="order-customer">
                  <span className="customer-name">{order.customer}</span>
                  
                </div>
                
                <div className="order-items">
                  <h4>Items:</h4>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="order-status-container">
                  <span className={`status-badge ${order.status.replace(/\s+/g, '-')}`}>
                    {order.status.toUpperCase()}
                  </span>
                  
                  <div className="status-actions">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="en preparación">En preparación</option>
                      <option value="listo">Listo</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                    
                    <button
                      onClick={() => updateOrderStatus(order.id, 'listo')}
                      className="action-button ready-btn"
                      disabled={order.status === 'listo'}
                    >
                      Marcar Listo
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-orders">
              <p>No hay pedidos {statusFilter !== 'todos' ? `en estado ${statusFilter}` : ''}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chef;