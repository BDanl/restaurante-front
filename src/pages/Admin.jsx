import React, { useState } from "react";
import "../styles/cards.css";
import "../styles/buttons.css";
import "../styles/admin.css";
import "../styles/modals.css";
import "../styles/dishes.css";
import OrdersSection from "../components/admin/sections/OrdersSection";
import UsersSection from "../components/admin/sections/UsersSection";
import MenuSection from "../components/admin/sections/MenuSection";
import ReportsSection from "../components/admin/sections/ReportsSection";
import DishesSection from "../components/admin/sections/DishesSection";
import TablesSection from "../components/admin/sections/TablesSection";
import { MenuProvider } from "../context/MenuContext";

const Admin = () => {
  const [activeSection, setActiveSection] = useState("orders");

  return (
    <MenuProvider>

    
    <div className="page-container">
      <h1>Panel de Administración</h1>

      {/* Barra de navegación entre secciones */}
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <div
          className="card-body"
          style={{ display: "flex", overflowX: "auto", padding: "0.5rem" }}
        >
          <button
            className={`action-button ${activeSection === "orders" ? "" : "secondary"}`}
            onClick={() => setActiveSection("orders")}
            style={{ marginRight: "0.5rem", whiteSpace: "nowrap" }}
          >
            Órdenes y Pagos
          </button>
          <button
            className={`action-button ${activeSection === "users" ? "" : "secondary"}`}
            onClick={() => setActiveSection("users")}
            style={{ marginRight: "0.5rem", whiteSpace: "nowrap" }}
          >
            Gestión de Usuarios
          </button>
          <button
            className={`action-button ${activeSection === "menu" ? "" : "secondary"}`}
            onClick={() => setActiveSection("menu")}
            style={{ marginRight: "0.5rem", whiteSpace: "nowrap" }}
          >
            Gestión del Menú
          </button>
          <button
            className={`action-button ${activeSection === "reports" ? "" : "secondary"}`}
            onClick={() => setActiveSection("reports")}
            style={{ whiteSpace: "nowrap" }}
          >
            Reportes de Ingredientes
          </button>
          <button
            className={`action-button ${activeSection === "dishes" ? "" : "secondary"}`}
            onClick={() => setActiveSection("dishes")}
            style={{ marginRight: "0.5rem", whiteSpace: "nowrap" }}
          >
            Gestión de Platos
          </button>
          <button 
            className={`action-button ${activeSection === 'tables' ? '' : 'secondary'}`}
            onClick={() => setActiveSection('tables')}
            style={{ marginRight: '0.5rem', whiteSpace: 'nowrap' }}
          >
            Gestión de Mesas
          </button>
        </div>
      </div>

      {/* Renderizar la sección activa */}
      {activeSection === "orders" && <OrdersSection />}
      {activeSection === "users" && <UsersSection />}
      {activeSection === "menu" && <MenuSection />}
      {activeSection === "reports" && <ReportsSection />}
      {activeSection === "dishes" && <DishesSection />}
      {activeSection === "tables" && <TablesSection />}
    </div>
    </MenuProvider>
  );
};

export default Admin;