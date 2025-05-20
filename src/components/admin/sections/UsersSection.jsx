// UsersSection.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import UserDetailsModal from "../modals/UserDetailsModal";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";

const UsersSection = () => {
  const { users, updateUserRole, deleteUser } = useAuth();
  const navigate = useNavigate();
  const [userToDelete, setUserToDelete] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Función para formatear la fecha de manera más legible
  const formatLastLogin = (lastLogin) => {
    if (!lastLogin) return "Nunca";
    
    // Si ya es un string formateado (como los nuevos accesos)
    if (typeof lastLogin === 'string') return lastLogin;
    
    // Para compatibilidad con fechas guardadas anteriormente como Date
    try {
      return new Date(lastLogin).toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return "Nunca";
    }
  };

  const confirmDelete = (userId) => setUserToDelete(userId);
  const cancelDelete = () => setUserToDelete(null);
  const executeDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete);
      setUserToDelete(null);
    }
  };
  const openUserDetails = (user) => {
    setSelectedUser(user);
    setShowPassword(false);
  };
  const closeUserDetails = () => setSelectedUser(null);

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Gestión de Usuarios</h2>
          <p style={{ color: "#666" }}>{users.length} usuarios registrados</p>
        </div>
        <div className="card-body">
          <div className="cards-grid" style={{ gridTemplateColumns: "1fr" }}>
            {users.map((user) => (
              <div key={user.id} className="card-item">
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: "0.25rem" }}>{user.name}</h3>
                  <p style={{ color: "#666", marginBottom: "0.25rem" }}>{user.email}</p>
                  <p style={{ fontSize: "0.9rem" }}>
                    Último acceso: <span style={{ color: "#888" }}>{formatLastLogin(user.lastLogin)}</span>
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <select
                    value={user.role}
                    onChange={(e) => updateUserRole(user.id, e.target.value)}
                    className="role-select"
                  >
                    <option value="admin">Administrador</option>
                    <option value="chef">Cocinero</option>
                    <option value="cashier">Cajero</option>
                    <option value="waiter">Mesero</option>
                    <option value="client">Cliente</option>
                  </select>

                  <button
                    onClick={() => openUserDetails(user)}
                    className="action-button"
                    style={{ padding: "0.5rem", minWidth: "40px" }}
                  >
                    👁️
                  </button>

                  <button
                    onClick={() => confirmDelete(user.id)}
                    className="action-button danger"
                    style={{ padding: "0.5rem" }}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Detalles de Usuario */}
      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          showPassword={showPassword}
          onClose={closeUserDetails}
          onTogglePassword={() => setShowPassword(!showPassword)}
          formatLastLogin={formatLastLogin}
        />
      )}

      {/* Tarjeta para agregar nuevo usuario */}
      <div
        className="card"
        style={{
          marginTop: "1.5rem",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onClick={() => navigate("/register")}
        onMouseEnter={(e) =>
          (e.currentTarget.style.boxShadow = "0 8px 25px rgba(108, 92, 231, 0.2)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.08)")
        }
      >
        <div className="card-body" style={{ textAlign: "center", padding: "2rem" }}>
          <h3 style={{ color: "var(--primary)", marginBottom: "0.5rem" }}>
            <span style={{ marginRight: "0.5rem" }}>+</span> Agregar Nuevo Usuario
          </h3>
          <p style={{ color: "#666" }}>Redirigir al formulario de registro</p>
        </div>
      </div>

      {/* Modal de confirmación para eliminar usuario */}
      {userToDelete && (
        <DeleteConfirmationModal
          onCancel={cancelDelete}
          onConfirm={executeDelete}
        />
      )}
    </>
  );
};

export default UsersSection;