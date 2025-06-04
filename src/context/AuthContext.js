import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
  const savedUsers = localStorage.getItem('restaurantUsers');
  if (savedUsers) {
    const parsedUsers = JSON.parse(savedUsers);
    const migratedUsers = parsedUsers.map(user => ({
      ...user,
      lastLogin: user.lastLogin || null
    }));
    setUsers(migratedUsers);
    localStorage.setItem('restaurantUsers', JSON.stringify(migratedUsers));
  }
  
  const savedUser = localStorage.getItem('restaurantCurrentUser');
  if (savedUser) {
    setUser(JSON.parse(savedUser));
    setIsAuthenticated(true);
  }
}, []);

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
    const updatedUser = {
      ...foundUser,
      lastLogin: new Date().toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    
    const updatedUsers = users.map(u => 
      u.id === foundUser.id ? updatedUser : u
    );
    
    setUser(updatedUser);
    setUsers(updatedUsers);
    setIsAuthenticated(true);
    
    localStorage.setItem('restaurantCurrentUser', JSON.stringify(updatedUser));
    localStorage.setItem('restaurantUsers', JSON.stringify(updatedUsers));
    
    navigate('/');
    return true;
  }
  return false;
};

 const register = (userData) => {
  const userExists = users.some(u => 
    u.email === userData.email || 
    (u.username && userData.username && u.username === userData.username)
  );
  
  if (userExists) {
    throw new Error('El usuario o correo ya están registrados');
  }

  const newUser = {
    ...userData,
    id: Date.now(),
    registrationDate: new Date().toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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

  const updateUserRole = (userId, newRole) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    );
    
    setUsers(updatedUsers);
    localStorage.setItem('restaurantUsers', JSON.stringify(updatedUsers));
    
    if (user?.id === userId) {
      const updatedUser = { ...user, role: newRole };
      setUser(updatedUser);
      localStorage.setItem('restaurantCurrentUser', JSON.stringify(updatedUser));
    }
  };

  const deleteUser = (userId) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('restaurantUsers', JSON.stringify(updatedUsers));
    
    if (user?.id === userId) {
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      users,
      login, 
      register,
      updateUserRole,
      deleteUser,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);