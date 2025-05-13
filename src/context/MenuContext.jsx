import { createContext, useContext, useState } from "react";

// 1. Crear el contexto
const MenuContext = createContext();

// 2. Crear el proveedor
export const MenuProvider = ({ children }) => {
  const [dishes, setDishes] = useState([
    {
      id: 1,
      name: "Pasta Alfredo",
      ingredients: ["Pasta", "Crema", "Queso Parmesano", "Mantequilla", "Ajo"],
      description: "Deliciosa pasta con salsa cremosa de queso parmesano y ajo",
      price: 12.99,
      category: "Plato principal",
      available: true,
    },
    {
      id: 2,
      name: "Ensalada César",
      ingredients: ["Lechuga", "Pollo", "Croutones", "Queso Parmesano", "Salsa César"],
      description: "Clásica ensalada César con pollo a la parrilla",
      price: 9.99,
      category: "Entrada",
      available: true,
    },
    
  ]);

  // Función para agregar un nuevo plato
  const addDish = (newDish) => {
    setDishes([...dishes, { ...newDish, id: Date.now() }]);
  };

  // Función para actualizar un plato existente
  const updateDish = (id, updatedDish) => {
    setDishes(dishes.map(dish => dish.id === id ? updatedDish : dish));
  };

  // Función para eliminar un plato
  const removeDish = (id) => {
    setDishes(dishes.filter(dish => dish.id !== id));
  };

  // Función para cambiar disponibilidad
  const toggleDishAvailability = (id) => {
    setDishes(dishes.map(dish => 
      dish.id === id ? { ...dish, available: !dish.available } : dish
    ));
  };

  return (
    <MenuContext.Provider 
      value={{ 
        dishes, 
        addDish, 
        updateDish, 
        removeDish,
        toggleDishAvailability
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

// 3. Crear hook personalizado para usar el contexto
export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu debe usarse dentro de un MenuProvider");
  }
  return context;
};