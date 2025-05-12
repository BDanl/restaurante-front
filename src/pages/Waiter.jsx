import React, { useState } from 'react';

const Waiter = () => {
  const [tables, setTables] = useState([
    { id: 1, status: 'disponible', order: null },
    { id: 2, status: 'ocupado', order: { items: ['Pasta Alfredo', 'Ensalada'], total: 21.49 } },
    { id: 3, status: 'disponible', order: null },
    { id: 4, status: 'ocupado', order: { items: ['Filete Mignon'], total: 22.99 } },
  ]);

  const takeOrder = (tableId) => {
    setTables(tables.map(table => 
      table.id === tableId 
        ? { 
            ...table, 
            status: 'ocupado', 
            order: { items: [], total: 0 } 
            // Inicializamos el pedido vacío
          } 
        : table
    ));
  };

  const closeTable = (tableId) => {
    setTables(tables.map(table => 
      table.id === tableId 
        ? { ...table, status: 'disponible', order: null } 
        : table
    ));
  };

  const addItemToOrder = (tableId, item) => {
    setTables(tables.map(table => {
      if (table.id !== tableId || table.status !== 'ocupado') return table;
      
      const newItems = [...table.order.items, item];
      return {
        ...table,
        order: {
          items: newItems,
          total: newItems.reduce((sum, item) => sum + (item.price || 10), 0) // Ejemplo de cálculo
        }
      };
    }));
  };

  return (
    <div className="page-container">
      <h1>Panel de Mesero</h1>
      <div className="tables-grid">
        {tables.map(table => (
          <div key={table.id} className={`table-card ${table.status}`}>
            <h3>Mesa {table.id}</h3>
            <p>Estado: {table.status}</p>
            
            {table.status === 'ocupado' && (
              <>
                <h4>Pedido:</h4>
                {table.order.items && table.order.items.length > 0 ? (
                  <ul>
                    {table.order.items.map((item, index) => (
                      <li key={index}>{typeof item === 'string' ? item : item.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay items en este pedido</p>
                )}
                
                {table.order.items && table.order.items.length > 0 && (
                  <p>Total: ${table.order.total.toFixed(3)}</p>
                )}
                
                <div className="table-actions">
                  <button 
                    onClick={() => addItemToOrder(table.id, 'Nuevo Item')}
                    className="action-button"
                  >
                    Añadir Item
                  </button>
                  <button 
                    onClick={() => closeTable(table.id)}
                    className="action-button danger"
                  >
                    Cerrar Mesa
                  </button>
                </div>
              </>
            )}
            
            {table.status === 'disponible' && (
              <button 
                onClick={() => takeOrder(table.id)}
                className="action-button"
              >
                Tomar Pedido
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Waiter;