import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Admin from '../pages/Admin';
import Chef from '../pages/Chef';
import Cashier from '../pages/Cashier';
import Client from '../pages/Client';
import Waiter from '../pages/Waiter';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Rutas privadas por rol */}
      <Route path="/admin" element={<PrivateRoute role="admin"><Admin /></PrivateRoute>} />
      <Route path="/chef" element={<PrivateRoute role="chef"><Chef /></PrivateRoute>} />
      <Route path="/cashier" element={<PrivateRoute role="cashier"><Cashier /></PrivateRoute>} />
      <Route path="/client" element={<PrivateRoute role="client"><Client /></PrivateRoute>} />
      <Route path="/waiter" element={<PrivateRoute role="waiter"><Waiter /></PrivateRoute>} />
    </Routes>
  );
};

export default AppRouter;