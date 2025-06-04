import React, { useState } from "react";
import TableFormModal from "../modals/TableFormModal";

const TablesSection = () => {
  const [tables, setTables] = useState([
    { id: 1, number: 'Mesa 1', capacity: 4, status: 'disponible', location: 'Interior' },
    { id: 2, number: 'Mesa 2', capacity: 6, status: 'ocupada', location: 'Terraza' },
    { id: 3, number: 'Mesa 3', capacity: 2, status: 'reservada', location: 'Interior' }
  ]);

  const [showTableForm, setShowTableForm] = useState(false);
  const [editingTable, setEditingTable] = useState(null);

  const removeTable = (id) => {
    setTables(tables.filter(table => table.id !== id));
  };

  const startEditingTable = (table) => {
    setEditingTable(table);
    setShowTableForm(true);
  };

  const cancelEditing = () => {
    setEditingTable(null);
    setShowTableForm(false);
  };

  const handleAddOrUpdateTable = (table) => {
    if (editingTable) {
      setTables(tables.map(t => (t.id === editingTable.id ? table : t)));
    } else {
      setTables([...tables, { ...table, id: Date.now() }]);
    }
    cancelEditing();
  };

  return (
    <div className="card">
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="card-title">Gestión de Mesas</h2>
        <button 
          onClick={() => setShowTableForm(!showTableForm)}
          className="action-button"
        >
          {showTableForm ? 'Cancelar' : '+ Agregar Mesa'}
        </button>
      </div>
      
      {showTableForm && (
        <TableFormModal
          table={editingTable}
          onSave={handleAddOrUpdateTable}
          onCancel={cancelEditing}
        />
      )}
      
      <div className="card-body">
        {tables.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
            No hay mesas registradas
          </p>
        ) : (
          <div className="cards-grid" style={{ gridTemplateColumns: '1fr' }}>
            {tables.map(table => (
              <div 
                key={table.id} 
                className="card-item"
                style={{
                  borderLeft: `4px solid ${
                    table.status === 'disponible' ? 'var(--success)' :
                    table.status === 'ocupada' ? 'var(--danger)' :
                    table.status === 'reservada' ? 'var(--warning)' : '#888'
                  }`
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ margin: 0 }}>{table.number}</h3>
                    <span style={{ 
                      backgroundColor: 
                        table.status === 'disponible' ? 'rgba(0, 184, 148, 0.1)' :
                        table.status === 'ocupada' ? 'rgba(214, 48, 49, 0.1)' :
                        table.status === 'reservada' ? 'rgba(253, 203, 110, 0.1)' : 'rgba(136, 136, 136, 0.1)',
                      color: 
                        table.status === 'disponible' ? 'var(--success)' :
                        table.status === 'ocupada' ? 'var(--danger)' :
                        table.status === 'reservada' ? 'var(--warning)' : '#888',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      textTransform: 'uppercase'
                    }}>
                      {table.status}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '2rem', margin: '0.75rem 0' }}>
                    <div>
                      <p style={{ color: '#666', marginBottom: '0.25rem' }}>Capacidad</p>
                      <p style={{ fontWeight: 'bold' }}>{table.capacity} personas</p>
                    </div>
                    
                    <div>
                      <p style={{ color: '#666', marginBottom: '0.25rem' }}>Ubicación</p>
                      <p style={{ fontWeight: 'bold' }}>{table.location}</p>
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => startEditingTable(table)}
                    className="action-button"
                    style={{ minWidth: '80px' }}
                  >
                    Editar
                  </button>
                  
                  <button 
                    onClick={() => removeTable(table.id)}
                    className="action-button danger"
                    style={{ minWidth: '80px' }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TablesSection;