import React from 'react';
import AppRouter from './routes/Router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { MenuProvider } from './context/MenuContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <MenuProvider>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <AppRouter />
          </main>
          <Footer />
        </div>
      </MenuProvider>
    </AuthProvider>
  );
}

export default App;