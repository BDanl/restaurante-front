import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Restaurante La Costeña</Link>
      </div>
      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <span>Bienvenido, {user.name} ({user.role})</span>
            <button onClick={handleLogout}>Cerrar sesión</button>
            {user.role === 'admin' && <Link to="/admin">Admin</Link>}
            {user.role === 'chef' && <Link to="/chef">Cocinero</Link>}
            {user.role === 'cashier' && <Link to="/cashier">Cajero</Link>}
            {user.role === 'client' && <Link to="/client">Cliente</Link>}
            {user.role === 'waiter' && <Link to="/waiter">Mesero</Link>}
          </>
        ) : (
          <>
            <Link to="/login">Iniciar sesión</Link>
            <Link to="/register">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;