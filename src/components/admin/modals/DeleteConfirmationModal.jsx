import React from "react";

const DeleteConfirmationModal = ({ onCancel, onConfirm }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div className="card" style={{ maxWidth: "500px", width: "90%" }}>
        <div className="card-header">
          <h2 className="card-title">Confirmar Eliminación</h2>
        </div>
        <div className="card-body">
          <p>
            ¿Estás seguro que deseas eliminar este usuario? Esta acción no se puede deshacer.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "1rem",
              marginTop: "1.5rem",
            }}
          >
            <button onClick={onCancel} className="action-button secondary">
              Cancelar
            </button>
            <button onClick={onConfirm} className="action-button danger">
              Eliminar Usuario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;