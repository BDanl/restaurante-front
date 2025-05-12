import React, { useState } from "react";

const DishFormModal = ({ dish, onSave, onCancel }) => {
  const [newDish, setNewDish] = useState(
    dish
      ? {
          name: dish.name,
          ingredients: dish.ingredients.join(", "),
          description: dish.description,
          price: dish.price.toString(),
          category: dish.category,
          available: dish.available,
        }
      : {
          name: "",
          ingredients: "",
          description: "",
          price: "",
          category: "Plato principal",
          available: true,
        }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDish((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ingredientsArray = newDish.ingredients
      .split(",")
      .map((ing) => ing.trim())
      .filter((ing) => ing !== "");

    const dishData = {
      id: dish?.id || Date.now(),
      name: newDish.name,
      ingredients: ingredientsArray,
      description: newDish.description,
      price: parseFloat(newDish.price),
      category: newDish.category,
      available: newDish.available,
    };

    onSave(dishData);
  };

  return (
    <div
      className="card-body"
      style={{
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        padding: "1.5rem",
      }}
    >
      <form onSubmit={handleSubmit}>
        <h3 style={{ marginBottom: "1.5rem", color: "var(--primary)" }}>
          {dish ? "Editar Plato" : "Agregar Nuevo Plato"}
        </h3>
        <div className="form-group">
          <label>Nombre del Plato</label>
          <input
            type="text"
            name="name"
            value={newDish.name}
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
            value={newDish.ingredients}
            onChange={handleInputChange}
            placeholder="Ej: Pasta, Crema, Queso Parmesano"
            required
          />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea
            name="description"
            value={newDish.description}
            onChange={handleInputChange}
            placeholder="Descripción detallada del plato"
            rows="3"
            required
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="form-group">
            <label>Precio ($)</label>
            <input
              type="number"
              name="price"
              value={newDish.price}
              onChange={handleInputChange}
              placeholder="Ej: 12.999"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label>Categoría</label>
            <select
              name="category"
              value={newDish.category}
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

        <div
          className="form-group"
          style={{ display: "flex", alignItems: "center", gap: "1rem" }}
        >
          <input
            type="checkbox"
            id="available"
            name="available"
            checked={newDish.available}
            onChange={(e) =>
              setNewDish({ ...newDish, available: e.target.checked })
            }
          />
          <label htmlFor="available" style={{ margin: 0 }}>
            Disponible
          </label>
        </div>

        <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
          <button type="submit" className="action-button">
            {dish ? "Actualizar Plato" : "Guardar Plato"}
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