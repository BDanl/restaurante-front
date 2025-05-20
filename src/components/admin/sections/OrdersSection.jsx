import React, { useState } from "react";

const OrdersSection = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      table: 5,
      items: ["Pasta Alfredo", "Ensalada"],
      status: "preparando",
      payment: "pendiente",
      time: "12:45 PM",
    },
    {
      id: 2,
      table: 3,
      items: ["Filete Mignon"],
      status: "listo",
      payment: "pagado",
      time: "1:15 PM",
    },
    {
      id: 3,
      table: 8,
      items: ["Sopa", "Sandwich"],
      status: "sin hacer",
      payment: "pendiente",
      time: "1:30 PM",
    },
  ]);

  const updateOrderStatus = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Órdenes y Pagos</h2>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <span
            style={{
              backgroundColor: "rgba(0, 184, 148, 0.1)",
              color: "var(--success)",
              padding: "0.25rem 0.5rem",
              borderRadius: "4px",
              fontSize: "0.9rem",
            }}
          >
            Pagados: {orders.filter((o) => o.payment === "pagado").length}
          </span>
          <span
            style={{
              backgroundColor: "rgba(253, 203, 110, 0.1)",
              color: "var(--warning)",
              padding: "0.25rem 0.5rem",
              borderRadius: "4px",
              fontSize: "0.9rem",
            }}
          >
            Pendientes: {orders.filter((o) => o.payment === "pendiente").length}
          </span>
        </div>
      </div>
      <div className="card-body">
        <div className="cards-grid" style={{ gridTemplateColumns: "1fr" }}>
          {orders.map((order) => (
            <div
              key={order.id}
              className="card-item"
              style={{
                borderLeft: `4px solid ${
                  order.payment === "pagado" ? "var(--success)" : "var(--warning)"
                }`,
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3 style={{ margin: 0 }}>Mesa {order.table}</h3>
                  <div>
                    <span
                      style={{
                        backgroundColor:
                          order.status === "listo"
                            ? "rgba(0, 184, 148, 0.1)"
                            : order.status === "preparando"
                            ? "rgba(253, 203, 110, 0.1)"
                            : "rgba(214, 48, 49, 0.1)",
                        color:
                          order.status === "listo"
                            ? "var(--success)"
                            : order.status === "preparando"
                            ? "var(--warning)"
                            : "var(--danger)",
                            
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.8rem",
                        marginRight: "0.5rem",
                      }}
                    >
                      {order.status.toUpperCase()}
                    </span>
                    <span style={{ color: "#888" }}>{order.time}</span>
                  </div>
                </div>

                <ul style={{ margin: "0.5rem 0", paddingLeft: "1rem" }}>
                  {order.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    style={{
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    <option value="sin hacer">Sin Hacer</option>
                    <option value="preparando">Preparando</option>
                    <option value="listo">Listo</option>
                  </select>

                  <span
                    style={{
                      fontWeight: "bold",
                      color: order.payment === "pagado" ? "var(--success)" : "var(--warning)",
                    }}
                  >
                    {order.payment === "pagado" ? "PAGADO" : "PENDIENTE"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersSection;