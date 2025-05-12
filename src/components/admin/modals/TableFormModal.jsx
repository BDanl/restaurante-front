import React, { useState } from "react";

const TableFormModal = ({ table, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    table || {
      number: '',
      capacity: 4,
      status: 'disponible',
      location: 'Interior'
    }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tableData = {
      ...formData,
      number: formData.number || `Mesa ${Math.floor(Math.random() * 100) + 1}`
    };
    onSave(tableData);
  };

  return (
    <div className="card-body" style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', padding: '1.5rem' }}>
      <form onSubmit={handleSubmit}>
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>
          {table ? 'Editar Mesa' : 'Agregar Nueva Mesa'}
        </h3>
        
        <div className="form-group">
          <label>Número/Identificador de Mesa</label>
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleInputChange}
            placeholder="Ej: Mesa 1, Terraza A, etc."
          />
        </div>
        
        <div className="form-group">
          <label>Capacidad</label>
          <select
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
          >
            {[2, 4, 6, 8, 10, 12].map(num => (
              <option key={num} value={num}>{num} personas</option>
            ))}
          </select>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label>Estado</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="disponible">Disponible</option>
              <option value="ocupada">Ocupada</option>
              <option value="reservada">Reservada</option>
              <option value="mantenimiento">En Mantenimiento</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Ubicación</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            >
              <option value="Interior">Interior</option>
              <option value="Terraza">Terraza</option>
              <option value="Barra">Barra</option>
              <option value="Sala Privada">Sala Privada</option>
            </select>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button 
            type="submit" 
            className="action-button"
          >
            {table ? 'Actualizar Mesa' : 'Guardar Mesa'}
          </button>
          
          <button 
            type="button"
            onClick={onCancel}
            className="action-button secondary"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default TableFormModal;