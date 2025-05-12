import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/cards.css';
import '../styles/buttons.css';
import '../styles/admin.css';
import '../styles/modals.css';

const Admin = () => {
  // Estados para las diferentes secciones
  const [activeSection, setActiveSection] = useState('orders');
  const [orders, setOrders] = useState([
    { id: 1, table: 5, items: ['Pasta Alfredo', 'Ensalada'], status: 'preparando', payment: 'pendiente', time: '12:45 PM' },
    { id: 2, table: 3, items: ['Filete Mignon'], status: 'listo', payment: 'pagado', time: '1:15 PM' },
    { id: 3, table: 8, items: ['Sopa', 'Sandwich'], status: 'pendiente', payment: 'pendiente', time: '1:30 PM' }
  ]);

  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Pasta Alfredo', price: 12.99, category: 'Plato principal', stock: true },
    { id: 2, name: 'Ensalada César', price: 8.50, category: 'Entrada', stock: false }
  ]);

  const [reports, setReports] = useState([
    { id: 1, ingredient: 'Pasta', status: 'urgente', needed: '5 kg', time: 'Hoy 9:00 AM' },
    { id: 2, ingredient: 'Queso Parmesano', status: 'bajo', needed: '2 kg', time: 'Ayer' }
  ]);

  

  const { users, updateUserRole, deleteUser } = useAuth();
  const navigate = useNavigate();

  // Estado para confirmación de eliminación
  const [userToDelete, setUserToDelete] = useState(null);

  // Función para confirmar eliminación
  const confirmDelete = (userId) => {
    setUserToDelete(userId);
  };

  // Función para cancelar eliminación
  const cancelDelete = () => {
    setUserToDelete(null);
  };

  // Función para ejecutar eliminación
  const executeDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete);
      setUserToDelete(null);
    }
  };

  // Funciones de gestión
  const updateOrderStatus = (id, newStatus) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  const toggleMenuItemStock = (id) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, stock: !item.stock } : item
    ));
  };

  const [selectedUser, setSelectedUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

   // Función para abrir el modal con los detalles del usuario
  const openUserDetails = (user) => {
    setSelectedUser(user);
    setShowPassword(false); // Por defecto ocultamos la contraseña
  };

  // Función para cerrar el modal
  const closeUserDetails = () => {
    setSelectedUser(null);
  };

  return (
    <div className="page-container">
      <h1>Panel de Administración</h1>
      
      {/* Barra de navegación entre secciones */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-body" style={{ display: 'flex', overflowX: 'auto', padding: '0.5rem' }}>
          <button 
            className={`action-button ${activeSection === 'orders' ? '' : 'secondary'}`}
            onClick={() => setActiveSection('orders')}
            style={{ marginRight: '0.5rem', whiteSpace: 'nowrap' }}
          >
            Órdenes y Pagos
          </button>
          <button 
            className={`action-button ${activeSection === 'users' ? '' : 'secondary'}`}
            onClick={() => setActiveSection('users')}
            style={{ marginRight: '0.5rem', whiteSpace: 'nowrap' }}
          >
            Gestión de Usuarios
          </button>
          <button 
            className={`action-button ${activeSection === 'menu' ? '' : 'secondary'}`}
            onClick={() => setActiveSection('menu')}
            style={{ marginRight: '0.5rem', whiteSpace: 'nowrap' }}
          >
            Gestión del Menú
          </button>
          <button 
            className={`action-button ${activeSection === 'reports' ? '' : 'secondary'}`}
            onClick={() => setActiveSection('reports')}
            style={{ whiteSpace: 'nowrap' }}
          >
            Reportes de Ingredientes
          </button>
        </div>
      </div>

      {/* Sección de Órdenes y Pagos */}
      {activeSection === 'orders' && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Órdenes y Pagos</h2>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ 
                backgroundColor: 'rgba(0, 184, 148, 0.1)', 
                color: 'var(--success)',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.9rem'
              }}>
                Pagados: {orders.filter(o => o.payment === 'pagado').length}
              </span>
              <span style={{ 
                backgroundColor: 'rgba(253, 203, 110, 0.1)', 
                color: 'var(--warning)',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.9rem'
              }}>
                Pendientes: {orders.filter(o => o.payment === 'pendiente').length}
              </span>
            </div>
          </div>
          <div className="card-body">
            <div className="cards-grid" style={{ gridTemplateColumns: '1fr' }}>
              {orders.map(order => (
                <div 
                  key={order.id} 
                  className="card-item"
                  style={{
                    borderLeft: `4px solid ${
                      order.payment === 'pagado' ? 'var(--success)' : 'var(--warning)'
                    }`
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h3 style={{ margin: 0 }}>Mesa {order.table}</h3>
                      <div>
                        <span style={{ 
                          backgroundColor: 
                            order.status === 'listo' ? 'rgba(0, 184, 148, 0.1)' :
                            order.status === 'preparando' ? 'rgba(253, 203, 110, 0.1)' : 'rgba(214, 48, 49, 0.1)',
                          color: 
                            order.status === 'listo' ? 'var(--success)' :
                            order.status === 'preparando' ? 'var(--warning)' : 'var(--danger)',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          marginRight: '0.5rem'
                        }}>
                          {order.status.toUpperCase()}
                        </span>
                        <span style={{ color: '#888' }}>{order.time}</span>
                      </div>
                    </div>
                    
                    <ul style={{ margin: '0.5rem 0', paddingLeft: '1rem' }}>
                      {order.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                    
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        style={{
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          border: '1px solid rgba(0,0,0,0.1)'
                        }}
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="preparando">Preparando</option>
                        <option value="listo">Listo</option>
                      </select>
                      
                      <span style={{ 
                        fontWeight: 'bold',
                        color: order.payment === 'pagado' ? 'var(--success)' : 'var(--warning)'
                      }}>
                        {order.payment === 'pagado' ? 'PAGADO' : 'PENDIENTE'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sección de Gestión de Usuarios */}
      {activeSection === 'users' && (
        <>
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Gestión de Usuarios</h2>
              <p style={{ color: '#666' }}>{users.length} usuarios registrados</p>
            </div>
            <div className="card-body">
              <div className="cards-grid" style={{ gridTemplateColumns: '1fr' }}>
                {users.map(user => (
                  <div key={user.id} className="card-item">
                    <div style={{ flex: 1 }}>
                      <h3 style={{ marginBottom: '0.25rem' }}>{user.name}</h3>
                      <p style={{ color: '#666', marginBottom: '0.25rem' }}>{user.email}</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Último acceso: <span style={{ color: '#888' }}>{user.lastLogin || 'Nunca'}</span>
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
                        style={{ padding: '0.5rem', minWidth: '40px' }}
                      >
                        👁️
                      </button>
                      
                      <button 
                        onClick={() => confirmDelete(user.id)}
                        className="action-button danger" 
                        style={{ padding: '0.5rem' }}
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
            <div className="modal-overlay">
              <div className="modal-card">
                <div className="modal-header">
                  <h2>Detalles del Usuario</h2>
                  <button onClick={closeUserDetails} className="modal-close-btn">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <div className="user-detail-row">
                    <span className="detail-label">Nombre:</span>
                    <span className="detail-value">{selectedUser.name}</span>
                  </div>
                  <div className="user-detail-row">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{selectedUser.email}</span>
                  </div>
                  <div className="user-detail-row">
                    <span className="detail-label">Nombre de Usuario:</span>
                    <span className="detail-value">{selectedUser.username || 'No especificado'}</span>
                  </div>
                  <div className="user-detail-row">
                    <span className="detail-label">Rol:</span>
                    <span className="detail-value" style={{ 
                      color: selectedUser.role === 'admin' ? 'var(--primary)' : 
                            selectedUser.role === 'client' ? 'var(--success)' : 'var(--dark)'
                    }}>
                      {selectedUser.role}
                    </span>
                  </div>
                  <div className="user-detail-row">
                    <span className="detail-label">Contraseña:</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="detail-value">
                        {showPassword ? selectedUser.password : '••••••••'}
                      </span>
                      <button 
                        onClick={() => setShowPassword(!showPassword)}
                        className="action-button secondary"
                        style={{ padding: '0.25rem 0.5rem' }}
                      >
                        {showPassword ? 'Ocultar' : 'Mostrar'}
                      </button>
                    </div>
                  </div>
                  <div className="user-detail-row">
                    <span className="detail-label">Fecha de Registro:</span>
                    <span className="detail-value">{selectedUser.registrationDate || 'No disponible'}</span>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    onClick={closeUserDetails}
                    className="action-button"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tarjeta para agregar nuevo usuario */}
          <div 
            className="card" 
            style={{ 
              marginTop: '1.5rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onClick={() => navigate('/register')}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 25px rgba(108, 92, 231, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.08)'}
          >
            <div className="card-body" style={{ textAlign: 'center', padding: '2rem' }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
                <span style={{ marginRight: '0.5rem' }}>+</span> Agregar Nuevo Usuario
              </h3>
              <p style={{ color: '#666' }}>Redirigir al formulario de registro</p>
            </div>
          </div>

          {/* Modal de confirmación para eliminar usuario */}
          {userToDelete && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000
            }}>
              <div className="card" style={{ maxWidth: '500px', width: '90%' }}>
                <div className="card-header">
                  <h2 className="card-title">Confirmar Eliminación</h2>
                </div>
                <div className="card-body">
                  <p>¿Estás seguro que deseas eliminar este usuario? Esta acción no se puede deshacer.</p>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end',
                    gap: '1rem',
                    marginTop: '1.5rem'
                  }}>
                    <button 
                      onClick={cancelDelete}
                      className="action-button secondary"
                    >
                      Cancelar
                    </button>
                    <button 
                      onClick={executeDelete}
                      className="action-button danger"
                    >
                      Eliminar Usuario
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {/* Sección de Gestión del Menú */}
      {activeSection === 'menu' && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Gestión del Menú</h2>
            <p style={{ color: '#666' }}>
              {menuItems.filter(i => i.stock).length} disponibles / {menuItems.length} items
            </p>
          </div>
          <div className="card-body">
            <div className="cards-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {menuItems.map(item => (
                <div 
                  key={item.id} 
                  className="card-item"
                  style={{
                    borderLeft: `4px solid ${item.stock ? 'var(--success)' : 'var(--danger)'}`
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h3 style={{ marginBottom: '0.25rem' }}>{item.name}</h3>
                    <p style={{ color: '#666', marginBottom: '0.25rem' }}>{item.category}</p>
                    <p style={{ fontWeight: 'bold' }}>${item.price.toFixed(2)}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <button 
                      onClick={() => toggleMenuItemStock(item.id)}
                      className={`action-button ${item.stock ? 'success' : 'danger'}`}
                      style={{ minWidth: '120px', marginBottom: '0.5rem' }}
                    >
                      {item.stock ? 'Disponible' : 'Agotado'}
                    </button>
                    <button className="action-button secondary" style={{ minWidth: '120px' }}>
                      Editar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sección de Reportes de Ingredientes */}
      {activeSection === 'reports' && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Reportes de Ingredientes</h2>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ 
                backgroundColor: 'rgba(214, 48, 49, 0.1)', 
                color: 'var(--danger)',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.9rem'
              }}>
                Urgentes: {reports.filter(r => r.status === 'urgente').length}
              </span>
              <span style={{ 
                backgroundColor: 'rgba(253, 203, 110, 0.1)', 
                color: 'var(--warning)',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.9rem'
              }}>
                Bajos: {reports.filter(r => r.status === 'bajo').length}
              </span>
            </div>
          </div>
          <div className="card-body">
            <div className="cards-grid" style={{ gridTemplateColumns: '1fr' }}>
              {reports.map(report => (
                <div 
                  key={report.id} 
                  className="card-item"
                  style={{
                    borderLeft: `4px solid ${
                      report.status === 'urgente' ? 'var(--danger)' : 'var(--warning)'
                    }`
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h3 style={{ marginBottom: '0.25rem' }}>{report.ingredient}</h3>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <span style={{ 
                        color: report.status === 'urgente' ? 'var(--danger)' : 'var(--warning)',
                        fontWeight: '500'
                      }}>
                        {report.status.toUpperCase()}
                      </span>
                      <span style={{ color: '#666' }}>Necesario: {report.needed}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#888', marginRight: '1rem' }}>{report.time}</span>
                    <button className="action-button" style={{ minWidth: '120px' }}>
                      Solucionado
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;