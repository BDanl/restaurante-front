import React, { useState } from 'react';
import '../styles/cards.css';

const Chef = () => {
  const [orders, setOrders] = useState([  
    { id: 1, table: 5, items: ['Pasta Alfredo', 'Ensalada César'], status: 'preparando', time: '15 min' },
    { id: 2, table: 3, items: ['Filete Mignon', 'Papas Fritas'], status: 'pendiente', time: '25 min' },
    { id: 3, table: 8, items: ['Sopa del día', 'Sandwich'], status: 'pendiente', time: '10 min' },
  ]);

  const markAsReady = (id) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: 'listo' } : order
    ));
  };

  return (
    <div className="page-container">
      <h1>Panel de Cocinero</h1>
      
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Órdenes en Cocina</h2>
          <p style={{ color: '#666' }}>{orders.length} órdenes activas</p>
        </div>
        <div className="card-body">
          {orders.map(order => (
            <div key={order.id} className="card-item" style={{
              borderLeft: `4px solid ${
                order.status === 'listo' ? 'var(--success)' : 
                order.status === 'preparando' ? 'var(--warning)' : 'var(--primary)'
              }`
            }}>
              <div>
                <h4 style={{ marginBottom: '0.5rem' }}>Mesa {order.table}</h4>
                <ul style={{ margin: '0.25rem 0', paddingLeft: '1rem' }}>
                  {order.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <p style={{ 
                  color: order.status === 'listo' ? 'var(--success)' : 
                        order.status === 'preparando' ? 'var(--warning)' : '#666',
                  fontWeight: '500'
                }}>
                  {order.status.toUpperCase()} • {order.time}
                </p>
              </div>
              {order.status !== 'listo' && (
                <button 
                  onClick={() => markAsReady(order.id)}
                  className="action-button"
                  style={{ minWidth: '120px' }}
                >
                  {order.status === 'preparando' ? 'Marcar Listo' : 'Comenzar'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chef;