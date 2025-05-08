import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]); 
  const navigate = useNavigate();

  // Cargar usuarios guardados al iniciar
  useEffect(() => {
    const savedUsers = localStorage.getItem('restaurantUsers');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
    
    const savedUser = localStorage.getItem('restaurantCurrentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (identifier, password) => {
    const foundUser = users.find(u => 
      (u.email === identifier || u.username === identifier) && 
      u.password === password
    );
    
    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('restaurantCurrentUser', JSON.stringify(foundUser));
      navigate('/');
      return true;
    }
    return false;
  };

 const register = (userData) => {
  const userExists = users.some(u => 
    u.email === userData.email || 
    u.username === userData.username
  );
  
  if (userExists) {
    throw new Error('El usuario o correo ya están registrados');
  }

  const newUser = {
    ...userData,
    id: Date.now()
  };

  const updatedUsers = [...users, newUser];
  setUsers(updatedUsers);
  localStorage.setItem('restaurantUsers', JSON.stringify(updatedUsers));
  
  return newUser;
};

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('restaurantCurrentUser');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      users,
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);