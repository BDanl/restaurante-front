import { createContext, useContext, useState } from "react";

const MenuContext = createContext();

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

  const addDish = (newDish) => {
    setDishes([...dishes, { ...newDish, id: Date.now() }]);
  };

  const updateDish = (id, updatedDish) => {
    setDishes(dishes.map(dish => dish.id === id ? updatedDish : dish));
  };

  const removeDish = (id) => {
    setDishes(dishes.filter(dish => dish.id !== id));
  };

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

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu debe usarse dentro de un MenuProvider");
  }
  return context;
};