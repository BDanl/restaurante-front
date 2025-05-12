import React, { useState } from "react";

const MenuSection = () => {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Pasta Alfredo",
      price: 12.999,
      category: "Plato principal",
      stock: true,
    },
    {
      id: 2,
      name: "Ensalada César",
      price: 8.502,
      category: "Entrada",
      stock: false,
    },
  ]);

  const toggleMenuItemStock = (id) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, stock: !item.stock } : item
      )
    );
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Gestión del Menú</h2>
        <p style={{ color: "#666" }}>
          {menuItems.filter((i) => i.stock).length} disponibles / {menuItems.length} items
        </p>
      </div>
      <div className="card-body">
        <div className="cards-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="card-item"
              style={{
                borderLeft: `4px solid ${item.stock ? "var(--success)" : "var(--danger)"}`,
              }}
            >
              <div style={{ flex: 1 }}>
                <h3 style={{ marginBottom: "0.25rem" }}>{item.name}</h3>
                <p style={{ color: "#666", marginBottom: "0.25rem" }}>{item.category}</p>
                <p style={{ fontWeight: "bold" }}>${item.price.toFixed(3)}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <button
                  onClick={() => toggleMenuItemStock(item.id)}
                  className={`action-button ${item.stock ? "success" : "danger"}`}
                  style={{ minWidth: "120px", marginBottom: "0.5rem" }}
                >
                  {item.stock ? "Disponible" : "Agotado"}
                </button>
                <button className="action-button secondary" style={{ minWidth: "120px" }}>
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuSection;