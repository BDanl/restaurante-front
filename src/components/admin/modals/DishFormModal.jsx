import React, { useState, useEffect } from "react";

const DishFormModal = ({ dish, onSave, onCancel }) => {

  const [formData, setFormData] = useState({
    name: "",
    ingredients: "",
    description: "",
    price: "",
    category: "Plato principal",
    available: true,
  });

  useEffect(() => {
    if (dish) {
      setFormData({
        name: dish.name,
        ingredients: dish.ingredients.join(", "),
        description: dish.description,
        price: dish.price.toString(),
        category: dish.category,
        available: dish.available,
      });
    }
  }, [dish]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ingredientsArray = formData.ingredients
      .split(",")
      .map(ing => ing.trim())
      .filter(ing => ing !== "");

    const dishToSave = {
      name: formData.name,
      ingredients: ingredientsArray,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      available: formData.available,
    };

    onSave(dishToSave);
  };

  return (
    <div className="card-body" style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', padding: '1.5rem' }}>
      <form onSubmit={handleSubmit}>
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>
          {dish ? 'Editar Plato' : 'Agregar Nuevo Plato'}
        </h3>
        
        <div className="form-group">
          <label>Nombre del Plato</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ej: Pasta Alfredo"
            required
          />
        </div>

        <div className="form-group">
          <label>Ingredientes (separados por comas)</label>
          <input
            type="text"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleInputChange}
            placeholder="Ej: Pasta, Crema, Queso Parmesano"
            required
          />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Descripción detallada del plato"
            rows="3"
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label>Precio ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Ej: 12.999"
              min="0"
              step="0.001"
              required
            />
          </div>

          <div className="form-group">
            <label>Categoría</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="Plato principal">Plato principal</option>
              <option value="Entrada">Entrada</option>
              <option value="Postre">Postre</option>
              <option value="Bebida">Bebida</option>
              <option value="Acompañamiento">Acompañamiento</option>
            </select>
          </div>
        </div>

        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <input
            type="checkbox"
            id="available"
            name="available"
            checked={formData.available}
            onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
          />
          <label htmlFor="available" style={{ margin: 0 }}>
            Disponible
          </label>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button type="submit" className="action-button">
            {dish ? 'Actualizar Plato' : 'Guardar Plato'}
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

export default DishFormModal;