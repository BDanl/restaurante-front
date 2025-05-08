import React from 'react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="page-container">
      <h1>Bienvenido al Sistema de Restaurante</h1>
      {isAuthenticated ? (
        <div className="welcome-message">
          <p>Hola {user.name}, has iniciado sesión como {user.role}.</p>
          <p>Usa el menú de navegación para acceder a las funciones de tu rol.</p>
        </div>
      ) : (
        <div className="auth-message">
          <p>Por favor inicia sesión o regístrate para acceder al sistema.</p>
          <div className="auth-buttons">
            <a href="/login" className="button">Iniciar Sesión</a>
            <a href="/register" className="button">Registrarse</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;