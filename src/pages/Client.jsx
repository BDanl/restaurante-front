import React, { useState } from 'react';
import '../styles/cards.css';

const Client = () => {
  const [menu] = useState([
    { id: 1, name: 'Pasta Alfredo', price: 12.99, category: 'plato principal' },
    { id: 2, name: 'Ensalada César', price: 8.50, category: 'entrada' },
    { id: 3, name: 'Filete Mignon', price: 22.99, category: 'plato principal' },
    { id: 4, name: 'Sopa del día', price: 6.99, category: 'entrada' },
  ]);

  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="page-container">
      <h1>Menú del Restaurante</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Nuestro Menú</h2>
            <p style={{ color: '#666' }}>Selecciona tus platillos favoritos</p>
          </div>
          <div className="card-body">
            <div className="cards-grid" style={{ gridTemplateColumns: '1fr' }}>
              {menu.map(item => (
                <div key={item.id} className="card-item">
                  <div>
                    <h4 style={{ marginBottom: '0.25rem' }}>{item.name}</h4>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>
                      {item.category} • ${item.price.toFixed(3)}
                    </p>
                  </div>
                  <button 
                    onClick={() => addToCart(item)}
                    className="action-button"
                    style={{ padding: '0.5rem 1rem' }}
                  >
                    Agregar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card card-primary">
          <div className="card-header">
            <h2 className="card-title">Tu Pedido</h2>
            <p style={{ color: '#666' }}>{cart.length} items seleccionados</p>
          </div>
          <div className="card-body">
            {cart.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#888' }}>No hay items en tu pedido</p>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id} className="card-item">
                    <span>{item.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span>${item.price.toFixed(2)}</span>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="action-button danger"
                        style={{ padding: '0.25rem 0.5rem' }}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
                <div style={{ 
                  borderTop: '1px solid rgba(0,0,0,0.1)', 
                  marginTop: '1rem', 
                  paddingTop: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <h4>Total:</h4>
                  <h3>${total.toFixed(2)}</h3>
                </div>
                <button 
                  className="action-button success"
                  style={{ width: '100%', marginTop: '1.5rem' }}
                >
                  Confirmar Pedido
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;