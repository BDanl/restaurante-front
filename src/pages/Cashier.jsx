import React, { useState } from "react";
import "../styles/cards.css";
import "../styles/buttons.css";

const Cashier = () => {
  const [bills, setBills] = useState([
    {
      id: 1,
      table: 5,
      items: ["Pasta Alfredo", "Ensalada César"],
      amount: 35.75,
      status: "pendiente",
      time: "12:45 PM",
    },
    {
      id: 2,
      table: 3,
      items: ["Filete Mignon", "Papas Fritas", "Refresco"],
      amount: 25.25,
      status: "pendiente",
      time: "12:30 PM",
    },
    {
      id: 3,
      table: 8,
      items: ["Sopa del día", "Sandwich"],
      amount: 65.25,
      status: "pendiente",
      time: "1:15 PM",
    },
    {
      id: 4,
      table: 2,
      items: ["Ensalada Griega", "Té Helado"],
      amount: 15.75,
      status: "pendiente",
      time: "1:30 PM",
    },
  ]);

  const [activeTab, setActiveTab] = useState("pending");

  const markAsPaid = (id) => {
    setBills(
      bills.map((bill) =>
        bill.id === id ? { ...bill, status: "pagado" } : bill
      )
    );
  };

  const filteredBills = bills.filter((bill) =>
    activeTab === "pending"
      ? bill.status === "pendiente"
      : bill.status === "pagado"
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const handleShowDetails = (bill) => {
    setSelectedBill(bill);
    setShowModal(true);
  };

  return (
    <div className="page-container">
      <h1>Panel de Cajero</h1>

      <div className="card">
        <div
          className="card-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 className="card-title">Gestión de Cuentas</h2>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              className={`action-button ${
                activeTab === "pending" ? "" : "secondary"
              }`}
              onClick={() => setActiveTab("pending")}
            >
              Pendientes
            </button>
            <button
              className={`action-button ${
                activeTab === "paid" ? "" : "secondary"
              }`}
              onClick={() => setActiveTab("paid")}
            >
              Pagadas
            </button>
          </div>
        </div>

        <div className="card-body">
          {filteredBills.length === 0 ? (
            <p style={{ textAlign: "center", padding: "2rem", color: "#888" }}>
              No hay cuentas{" "}
              {activeTab === "pending" ? "pendientes" : "pagadas"}
            </p>
          ) : (
            <div className="cards-grid" style={{ gridTemplateColumns: "1fr" }}>
              {filteredBills.map((bill) => (
                <div
                  key={bill.id}
                  className="card-item"
                  style={{
                    borderLeft: `4px solid ${
                      bill.status === "pagado"
                        ? "var(--success)"
                        : "var(--warning)"
                    }`,
                  }}
                >
                  <div className="table-details" style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <h3 style={{ margin: 0 }}>Mesa {bill.table}</h3>
                      <span
                        style={{
                          color:
                            bill.status === "pagado"
                              ? "var(--success)"
                              : "var(--warning)",
                          fontWeight: "500",
                        }}
                      >
                        {bill.status === "pagado" ? "PAGADO" : "PENDIENTE"}
                      </span>
                    </div>

                    

                    <ul
                      className="items-list"
                      style={{
                        margin: "0.5rem 0",
                        paddingLeft: "1rem",
                        color: "#555",
                      }}
                    >
                      {bill.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    
                    <div
                      className="time-amount"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "0.5rem",
                      }}
                    >
                      <small style={{ color: "#888" }}>{bill.time}</small>
                      <strong style={{ fontSize: "1.1rem" }}>
                        ${bill.amount.toFixed(3)}
                      </strong>
                    </div>
                    
                  </div>

                  {bill.status === "pendiente" && (
                    <div
                      className="actions"
                      style={{ display: "flex", gap: "0.5rem" }}
                    >
                      <button
                        onClick={() => markAsPaid(bill.id)}
                        className="action-button success"
                        style={{ minWidth: "120px" }}
                      >
                        Marcar Pagado
                      </button>
                      <button
                        className="action-button secondary"
                        onClick={() => handleShowDetails(bill)}
                      >
                        Detalles
                      </button>
                    </div>
                  )}
                  {bill.status === "pagado" && (
                    <div
                      className="actions"
                      style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "flex-end",
                        gap: "0.5rem" 
                      }}
                    >
                      <button
                        className="action-button secondary"
                        onClick={() => handleShowDetails(bill)}
                      >
                        Detalles
                      </button>
                    </div>
                    )}
                  
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Resumen del Día</h2>
        </div>
        <div className="card-body">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#666", marginBottom: "0.25rem" }}>
                Total Ventas
              </p>
              <h3 style={{ margin: 0, color: "var(--primary)" }}>
                $
                {bills
                  .filter((bill) => bill.status === "pagado")
                  .reduce((sum, bill) => sum + bill.amount, 0)
                  .toFixed(2)}
              </h3>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#666", marginBottom: "0.25rem" }}>
                Cuentas Pagadas
              </p>
              <h3 style={{ margin: 0, color: "var(--success)" }}>
                {bills.filter((bill) => bill.status === "pagado").length}
              </h3>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#666", marginBottom: "0.25rem" }}>
                Cuentas Pendientes
              </p>
              <h3 style={{ margin: 0, color: "var(--warning)" }}>
                {bills.filter((bill) => bill.status === "pendiente").length}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {showModal && selectedBill && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Detalles de la Cuenta</h2>
            <p>
              <strong>Mesa:</strong> {selectedBill.table}
            </p>
            <p>
              <strong>Estado:</strong>{" "}
              {selectedBill.status === "pagado" ? "Pagado" : "Pendiente"}
            </p>
            <p>
              <strong>Hora:</strong> {selectedBill.time}
            </p>
            <p>
              <strong>Monto:</strong> ${selectedBill.amount.toFixed(2)}
            </p>
            <p>
              <strong>Ítems:</strong>
            </p>
            <ul>
              {selectedBill.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.5rem",
                marginTop: "1.5rem",
              }}
            >
              {selectedBill.status === "pendiente" && (
                <button
                  className="action-button success"
                  onClick={() => {
                    markAsPaid(selectedBill.id);
                    setShowModal(false);
                  }}
                >
                  Marcar como Pagado
                </button>
              )}
              <button
                className="action-button secondary"
                onClick={() => setShowModal(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cashier;
