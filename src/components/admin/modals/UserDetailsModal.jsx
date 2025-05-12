import React from "react";

const UserDetailsModal = ({ user, showPassword, onClose, onTogglePassword }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h2>Detalles del Usuario</h2>
          <button onClick={onClose} className="modal-close-btn">
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="user-detail-row">
            <span className="detail-label">Nombre:</span>
            <span className="detail-value">{user.name}</span>
          </div>
          <div className="user-detail-row">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{user.email}</span>
          </div>
          <div className="user-detail-row">
            <span className="detail-label">Nombre de Usuario:</span>
            <span className="detail-value">{user.username || "No especificado"}</span>
          </div>
          <div className="user-detail-row">
            <span className="detail-label">Rol:</span>
            <span
              className="detail-value"
              style={{
                color:
                  user.role === "admin"
                    ? "var(--primary)"
                    : user.role === "client"
                    ? "var(--success)"
                    : "var(--dark)",
              }}
            >
              {user.role}
            </span>
          </div>
          <div className="user-detail-row">
            <span className="detail-label">Contraseña:</span>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span className="detail-value">
                {showPassword ? user.password : "••••••••"}
              </span>
              <button
                onClick={onTogglePassword}
                className="action-button secondary"
                style={{ padding: "0.25rem 0.5rem" }}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>
          <div className="user-detail-row">
            <span className="detail-label">Fecha de Registro:</span>
            <span className="detail-value">
              {user.registrationDate || "No disponible"}
            </span>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="action-button">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;