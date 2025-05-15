import React from 'react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="home-container" style={{minHeight: "80vh", display: "flex", backgroundImage: `url(${"https://images.unsplash.com/photo-1604153351961-cdb582bb326a?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"})` }}>
    <div className="page-container" >
      <h1>Bienvenido al Sistema de Restaurante</h1>
      {isAuthenticated ? (
        <div className="welcome-message" >
          <p>Hola {user.name}, has iniciado sesión como {user.role}.</p>
          <p>Usa el menú de navegación para acceder a las funciones de tu rol.</p>
        </div>
      ) : (
        <div className="auth-message" >
          <p>Por favor inicia sesión o regístrate para acceder al sistema.</p>
          <div className="auth-buttons">
            <a href="/login" className="button">Iniciar Sesión</a>
            <a href="/register" className="button">Registrarse</a>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Home;