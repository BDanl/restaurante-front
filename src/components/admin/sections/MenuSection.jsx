import React from "react";
import { useMenu } from "../../../context/MenuContext";

const MenuSection = () => {
  const { dishes, toggleDishAvailability } = useMenu();
  
  const categories = [
    "Plato principal",
    "Entrada",
    "Postre",
    "Bebida",
    "Acompañamiento"
  ];
  
  const dishesByCategory = {};
  categories.forEach(category => {
    dishesByCategory[category] = dishes.filter(dish => dish.category === category);
  });

  return (
    <div className="card" >
      <div className="card-header" style={{maxWidth:"90%",justifyContent: "center", margin:"0 auto"}}>
        <h2 className="card-title">Menú del Restaurante</h2>
        <p style={{ color: "#666" }}>
          {dishes.filter(dish => dish.available).length} disponibles / {dishes.length} platos
        </p>
      </div>
      <div className="card-body" style={{ maxHeight: "600px", overflowY: "auto", maxWidth: "90%", justifyContent: "center", margin: "0 auto" }}>
        {categories.map((category) => (
          <div key={category} style={{ marginBottom: "2rem" }}>
            <h3 style={{ 
              color: "var(--primary)",
              borderBottom: "2px solid var(--primary)",
              paddingBottom: "0.5rem",
              marginBottom: "1rem"
            }}>
              {category}
            </h3>
            
            {dishesByCategory[category].length === 0 ? (
              <p style={{ color: "#888", fontStyle: "italic" }}>
                No hay platos en esta categoría
              </p>
            ) : (
              <div className="cards-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {dishesByCategory[category].map((dish) => (
                  <div
                    key={dish.id}
                    className="card-item"
                    style={{
                      borderLeft: `4px solid ${dish.available ? "var(--success)" : "var(--danger)"}`,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h4 style={{ marginBottom: "0.25rem" }}>{dish.name}</h4>
                      <p style={{ color: "#666", marginBottom: "0.25rem" }}>{dish.description}</p>
                      <p style={{ fontWeight: "bold" }}>${dish.price.toFixed(3)}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                      <button
                        onClick={() => toggleDishAvailability(dish.id)}
                        className={`action-button ${dish.available ? "success" : "danger"}`}
                        style={{ minWidth: "120px" }}
                      >
                        {dish.available ? "Disponible" : "No disponible"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuSection;