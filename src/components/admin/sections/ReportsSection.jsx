import React, { useState } from "react";

const ReportsSection = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      ingredient: "Pasta",
      status: "urgente",
      needed: "5 kg",
      time: "Hoy 9:00 AM",
    },
    {
      id: 2,
      ingredient: "Queso Parmesano",
      status: "bajo",
      needed: "2 kg",
      time: "Ayer",
    },
  ]);

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Reportes de Ingredientes</h2>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <span
            style={{
              backgroundColor: "rgba(214, 48, 49, 0.1)",
              color: "var(--danger)",
              padding: "0.25rem 0.5rem",
              borderRadius: "4px",
              fontSize: "0.9rem",
            }}
          >
            Urgentes: {reports.filter((r) => r.status === "urgente").length}
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
            Bajos: {reports.filter((r) => r.status === "bajo").length}
          </span>
        </div>
      </div>
      <div className="card-body">
        <div className="cards-grid" style={{ gridTemplateColumns: "1fr" }}>
          {reports.map((report) => (
            <div
              key={report.id}
              className="card-item"
              style={{
                borderLeft: `4px solid ${
                  report.status === "urgente" ? "var(--danger)" : "var(--warning)"
                }`,
              }}
            >
              <div style={{ flex: 1 }}>
                <h3 style={{ marginBottom: "0.25rem" }}>{report.ingredient}</h3>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <span
                    style={{
                      color: report.status === "urgente" ? "var(--danger)" : "var(--warning)",
                      fontWeight: "500",
                    }}
                  >
                    {report.status.toUpperCase()}
                  </span>
                  <span style={{ color: "#666" }}>Necesario: {report.needed}</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ color: "#888", marginRight: "1rem" }}>{report.time}</span>
                <button className="action-button" style={{ minWidth: "120px" }}>
                  Solucionado
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsSection;