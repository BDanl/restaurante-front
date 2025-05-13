import React, { useState } from "react";
import { useMenu } from "../../../context/MenuContext";
import DishFormModal from "../modals/DishFormModal";

const DishesSection = () => {
  const { dishes, addDish, updateDish, removeDish } = useMenu();
  const [showDishForm, setShowDishForm] = useState(false);
  const [editingDish, setEditingDish] = useState(null);

  const handleAddOrUpdateDish = (dishData) => {
    if (editingDish) {
      updateDish(editingDish.id, dishData);
    } else {
      addDish(dishData);
    }
    setShowDishForm(false);
    setEditingDish(null);
  };

  const startEditing = (dish) => {
    setEditingDish(dish);
    setShowDishForm(true);
  };

  const cancelEditing = () => {
    setEditingDish(null);
    setShowDishForm(false);
  };

  return (
    <div className="card">
      <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 className="card-title">Gestión de Platos</h2>
        <button
          onClick={() => setShowDishForm(!showDishForm)}
          className="action-button"
        >
          {showDishForm ? "Cancelar" : "+ Agregar Plato"}
        </button>
      </div>

      {showDishForm && (
        <DishFormModal
          dish={editingDish}
          onSave={handleAddOrUpdateDish}
          onCancel={cancelEditing}
        />
      )}

      <div className="card-body">
        {dishes.length === 0 ? (
          <p style={{ textAlign: "center", padding: "2rem", color: "#888" }}>
            No hay platos registrados
          </p>
        ) : (
          <div className="cards-grid" style={{ gridTemplateColumns: "1fr" }}>
            {dishes.map((dish) => (
              <DishCard 
                key={dish.id}
                dish={dish}
                onEdit={() => startEditing(dish)}
                onDelete={() => removeDish(dish.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const DishCard = ({ dish, onEdit, onDelete }) => (
  <div className="card-item" style={{ borderLeft: `4px solid ${dish.available ? "var(--success)" : "var(--danger)"}` }}>
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ margin: 0 }}>{dish.name}</h3>
        <span style={{
          backgroundColor: dish.available ? "rgba(0, 184, 148, 0.1)" : "rgba(214, 48, 49, 0.1)",
          color: dish.available ? "var(--success)" : "var(--danger)",
          padding: "0.25rem 0.5rem",
          borderRadius: "4px",
          fontSize: "0.8rem",
        }}>
          {dish.available ? "DISPONIBLE" : "NO DISPONIBLE"}
        </span>
      </div>

      <p style={{ color: "#666", margin: "0.5rem 0" }}>{dish.description}</p>

      <div style={{ margin: "0.5rem 0" }}>
        <p style={{ fontWeight: "500", marginBottom: "0.25rem" }}>Ingredientes:</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {dish.ingredients.map((ingredient, index) => (
            <span
              key={index}
              style={{
                backgroundColor: "rgba(108, 92, 231, 0.1)",
                color: "var(--primary)",
                padding: "0.25rem 0.5rem",
                borderRadius: "4px",
                fontSize: "0.8rem",
              }}
            >
              {ingredient}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
        <span style={{ color: "#888" }}>{dish.category}</span>
        <span style={{ fontWeight: "bold" }}>${dish.price.toFixed(3)}</span>
      </div>
    </div>

    <div style={{ display: "flex", gap: "0.5rem", alignSelf: "flex-start" }}>
      <button
        onClick={onEdit}
        className="action-button"
        style={{ minWidth: "80px" }}
      >
        Editar
      </button>
      <button
        onClick={onDelete}
        className="action-button danger"
        style={{ minWidth: "80px" }}
      >
        Eliminar
      </button>
    </div>
  </div>
);

export default DishesSection;