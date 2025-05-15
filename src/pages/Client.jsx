import React, { useState, useEffect } from 'react';
import '../styles/bento.css';

const Client = () => {
  const menuCategories = [
    {
      id: 1,
      name: 'Entradas',
      subcategories: [
        {
          id: 'ensaladas',
          name: 'Ensaladas',
          items: [
            { id: 101, name: 'Ensalada César', price: 18.500, description: 'Lechuga romana, croutones, queso parmesano y aderezo césar' },
            { id: 102, name: 'Ensalada Caprese', price: 19.000, description: 'Tomate, mozzarella fresca, albahaca y aceite de oliva' },
            { id: 103, name: 'Ensalada Griega', price: 19.500, description: 'Pepino, tomate, aceitunas kalamata, queso feta y aderezo de limón' },
            { id: 104, name: 'Ensalada de Quinoa', price: 10.000, description: 'Quinoa, aguacate, granada, espinacas y aderezo de miel' },
            { id: 105, name: 'Ensalada Waldorf', price: 18.750, description: 'Manzana, apio, nueces, uvas pasas y mayonesa ligera' },
            { id: 106, name: 'Ensalada de Espinacas', price: 18.500, description: 'Espinacas frescas, fresas, almendras y vinagreta balsámica' }
          ]
        },
        {
          id: 'antipastos',
          name: 'Antipastos',
          items: [
            { id: 107, name: 'Bruschettas Clásicas', price: 17.500, description: 'Pan tostado con tomate, albahaca y ajo' },
            { id: 108, name: 'Tabla de Quesos', price: 12.000, description: 'Selección de 3 quesos artesanales con frutos secos' },
            { id: 109, name: 'Carpaccio de Res', price: 11.50, description: 'Finas láminas de res con rúcula y parmesano' },
            { id: 110, name: 'Aceitunas Marinadas', price: 16.000, description: 'Aceitunas verdes y negras con hierbas provenzales' },
            { id: 111, name: 'Pan con Tomate', price: 15.500, description: 'Pan rústico con tomate fresco, ajo y aceite de oliva' },
            { id: 112, name: 'Hummus con Pita', price: 17.000, description: 'Puré de garbanzos con pan pita tostado' }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Platos Fuertes',
      subcategories: [
        {
          id: 'pasta',
          name: 'Pastas',
          items: [
            { id: 201, name: 'Spaghetti Carbonara', price: 14.500, description: 'Pasta con huevo, panceta, queso pecorino y pimienta negra' },
            { id: 202, name: 'Lasagna Bolognesa', price: 15.000, description: 'Capas de pasta con carne, salsa boloñesa y bechamel' },
            { id: 203, name: 'Penne al Pesto', price: 13.500, description: 'Pasta con salsa de albahaca, piñones y queso parmesano' },
            { id: 204, name: 'Raviolis de Ricotta', price: 14.000, description: 'Raviolis rellenos de ricotta con salsa de tomate' },
            { id: 205, name: 'Fettuccine Alfredo', price: 14.500, description: 'Pasta con salsa cremosa de queso parmesano' },
            { id: 206, name: 'Gnocchi a la Romana', price: 13.000, description: 'Ñoquis con salsa de tomate y albahaca fresca' }
          ]
        },
        {
          id: 'carnes',
          name: 'Carnes',
          items: [
            { id: 207, name: 'Filete Mignon', price: 22.500, description: 'Corte premium de res con guarniciones' },
            { id: 208, name: 'Pollo a la Parrilla', price: 16.000, description: 'Pechuga de pollo marinada con hierbas' },
            { id: 209, name: 'Costillas BBQ', price: 18.500, description: 'Costillas de cerdo glaseadas con salsa barbacoa' },
            { id: 210, name: 'Lomo de Cerdo', price: 17.500, description: 'Lomo asado con salsa de mostaza y miel' },
            { id: 211, name: 'Cordero al Romero', price: 21.000, description: 'Pierna de cordero con romero y papas rústicas' },
            { id: 212, name: 'Milanesa Napolitana', price: 15.500, description: 'Milanesa de ternera con jamón, queso y tomate' }
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'Acompañamientos',
      subcategories: [
        {
          id: 'clásicos',
          name: 'Clásicos',
          items: [
            { id: 301, name: 'Papas Fritas', price: 4.500, description: 'Crujientes papas fritas caseras' },
            { id: 302, name: 'Arroz Blanco', price: 3.500, description: 'Arroz blanco esponjoso' },
            { id: 303, name: 'Puré de Papas', price: 4.000, description: 'Puré cremoso con mantequilla y leche' },
            { id: 304, name: 'Papas al Horno', price: 5.000, description: 'Papas asadas con romero y ajo' },
            { id: 305, name: 'Polenta Cremosa', price: 4.500, description: 'Polenta con queso parmesano y mantequilla' },
            { id: 306, name: 'Frijoles Refritos', price: 4.000, description: 'Frijoles cocidos y refritos con especias' }
          ]
        },
        {
          id: 'vegetales',
          name: 'Vegetales',
          items: [
            { id: 307, name: 'Vegetales Salteados', price: 5.000, description: 'Mezcla de vegetales frescos salteados' },
            { id: 308, name: 'Espárragos a la Parrilla', price: 6.500, description: 'Espárragos con aceite de oliva y limón' },
            { id: 309, name: 'Brócoli al Vapor', price: 4.500, description: 'Brócoli fresco cocido al vapor' },
            { id: 310, name: 'Coliflor Gratinada', price: 5.500, description: 'Coliflor con salsa bechamel y queso gratinado' },
            { id: 311, name: 'Zanahorias Glaseadas', price: 4.500, description: 'Zanahorias con miel y mantequilla' },
            { id: 312, name: 'Champiñones Salteados', price: 5.500, description: 'Champiñones con ajo y perejil fresco' }
          ]
        }
      ]
    },
    {
    id: 4,
    name: 'Postres',
    subcategories: [
      {
        id: 'clásicos-postres',
        name: 'Clásicos',
        items: [
          { id: 401, name: 'Tiramisú', price: 6.500, description: 'Postre italiano con café y mascarpone' },
          { id: 402, name: 'Flan Casero', price: 5.500, description: 'Flan de vainilla con caramelo' },
          { id: 403, name: 'Cheesecake', price: 7.000, description: 'Tarta de queso con base de galleta' },
          { id: 404, name: 'Brownie con Helado', price: 6.050, description: 'Brownie de chocolate con helado de vainilla' },
          { id: 405, name: 'Profiteroles', price: 6.000, description: 'Bollos de crema con salsa de chocolate' },
          { id: 406, name: 'Mousse de Chocolate', price: 5.500, description: 'Mousse ligero de chocolate negro' },
          { id: 413, name: 'Crème Brûlée', price: 7.500, description: 'Crema de vainilla con caramelo crujiente' },
          { id: 414, name: 'Tarta de Manzana', price: 6.000, description: 'Tarta tradicional con canela y helado' },
          { id: 415, name: 'Coulant de Chocolate', price: 7.000, description: 'Pastel de chocolate con centro líquido' }
        ]
      },
      {
        id: 'helados',
        name: 'Helados',
        items: [
          { id: 407, name: 'Helado de Vainilla', price: 4.000, description: 'Helado artesanal de vainilla' },
          { id: 408, name: 'Helado de Chocolate', price: 4.000, description: 'Helado artesanal de chocolate' },
          { id: 409, name: 'Helado de Fresa', price: 4.000, description: 'Helado artesanal de fresa' },
          { id: 410, name: 'Sundae Clásico', price: 6.500, description: 'Helado con salsa, nueces y crema batida' },
          { id: 411, name: 'Banana Split', price: 7.500, description: 'Plátano con helados y toppings' },
          { id: 412, name: 'Sorbete de Limón', price: 4.500, description: 'Sorbete refrescante de limón' },
          { id: 416, name: 'Helado de Menta', price: 4.500, description: 'Helado refrescante de menta con chips de chocolate' },
          { id: 417, name: 'Helado de Dulce de Leche', price: 4.500, description: 'Helado cremoso de dulce de leche' },
          { id: 418, name: 'Granizado de Café', price: 5.000, description: 'Helado de café con trozos de hielo' }
        ]
      },
      {
        id: 'postres-regionales',
        name: 'Regionales',
        items: [
          { id: 419, name: 'Alfajores de Maicena', price: 4.500, description: 'Dos galletas rellenas de dulce de leche' },
          { id: 420, name: 'Quesillo', price: 5.500, description: 'Flan venezolano más cremoso y denso' },
          { id: 421, name: 'Tres Leches', price: 6.000, description: 'Bizcocho empapado en mezcla de tres leches' }
        ]
      }
    ]
  },
  {
    id: 5,
    name: 'Bebidas',
    subcategories: [
      {
        id: 'refrescos',
        name: 'Refrescos',
        items: [
          { id: 501, name: 'Coca-Cola', price: 3.000, description: 'Refresco de cola', url: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
          { id: 502, name: 'Sprite', price: 3.000, description: 'Refresco de lima-limón', url:'https://images.unsplash.com/photo-1680404005217-a441afdefe83?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
          { id: 503, name: 'Fanta', price: 3.00, description: 'Refresco de naranja', url:'https://cdn.shopify.com/s/files/1/0558/6413/1764/files/Fanta_Logo_Design_History_Evolution_0_1024x1024.jpg?v=1693460247' },
          { id: 504, name: 'Agua Mineral', price: 2.500, description: 'Agua mineral con o sin gas', url:'https://static.compreloadomicilio.com/okeysaludable/products/053/6175c6ed9409a397053885.webp' },
          { id: 505, name: 'Jugo de Naranja', price: 4.000, description: 'Jugo natural de naranja', url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxazPjBOioppsAuMcn0s1rQOF2hwjdtqUciA&s' },
          { id: 506, name: 'Limonada', price: 3.500, description: 'Limonada natural con hierbabuena', url:'https://www.recetas-francesas.com/base/stock/Recipe/limonada/limonada_web.jpg.webp' },
          { id: 513, name: 'Jugo de Maracuyá', price: 4.500, description: 'Jugo tropical de fruta de la pasión' },
          { id: 514, name: 'Té Helado', price: 3.500, description: 'Té negro frío con limón' },
          { id: 515, name: 'Agua de Coco', price: 4.000, description: 'Agua de coco natural refrescante' }
        ]
      },
      {
        id: 'bebidas-calientes',
        name: 'Bebidas Calientes',
        items: [
          { id: 507, name: 'Café Americano', price: 2.500, description: 'Café negro americano' },
          { id: 508, name: 'Cappuccino', price: 3.500, description: 'Café con leche espumosa' },
          { id: 509, name: 'Té Negro', price: 2.500, description: 'Té negro con limón o leche' },
          { id: 510, name: 'Té Verde', price: 2.500, description: 'Té verde con hierbas' },
          { id: 511, name: 'Chocolate Caliente', price: 4.000, description: 'Chocolate espeso con leche' },
          { id: 512, name: 'Café Irlandés', price: 5.500, description: 'Café con whisky irlandés y crema' },
          { id: 516, name: 'Café Vienés', price: 4.500, description: 'Café con crema batida y canela' },
          { id: 517, name: 'Té Chai', price: 3.500, description: 'Té especiado con leche' },
          { id: 518, name: 'Mocaccino', price: 4.000, description: 'Café con chocolate y crema' }
        ]
      },
      {
        id: 'bebidas-especiales',
        name: 'Especiales',
        items: [
          { id: 519, name: 'Mojito Sin Alcohol', price: 5.500, description: 'Lima, menta, azúcar y soda' },
          { id: 520, name: 'Smoothie de Frutas', price: 6.000, description: 'Mezcla de frutas frescas con yogurt' },
          { id: 521, name: 'Batido de Avellana', price: 5.500, description: 'Batido cremoso de avellana y chocolate' }
        ]
      }
    ]
  }
];

  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  useEffect(() => {
    if (menuCategories.length > 0) {
      setActiveCategory(menuCategories[0].id);
    }
  }, []);

  useEffect(() => {
    const selectedCategory = menuCategories.find(c => c.id === activeCategory);
    if (selectedCategory?.subcategories?.length) {
      setActiveSubcategory(selectedCategory.subcategories[0].id);
    } else {
      setActiveSubcategory(null);
    }
  }, [activeCategory]);

  const selectedCategory = menuCategories.find(c => c.id === activeCategory);
  const selectedSubcategory = selectedCategory?.subcategories?.find(sc => sc.id === activeSubcategory);

  return (

    <div className="menu-container"> {/* Nuevo div contenedor */}
    <div className="bento-container">
      <div className="bento-header">
        <h1>Menú del Restaurante</h1>
      </div>

      <div className="bento-grid">
        {/* Categorías */}
        <div className="bento-categories">
          <h2>Categorías</h2>
          <div className="category-list">
            {menuCategories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Productos */}
        <div className="bento-products">
          <h2>{selectedSubcategory?.name || 'Productos'}</h2>
          <div className="product-grid">
            {selectedSubcategory?.items?.map(item => (
              <div key={item.id} className="product-card">
                <div className="product-image">
  {item.url ? (
    <img 
      src={item.url} 
      alt={item.name}
      onError={(e) => {
        e.target.onerror = null; 
        e.target.src = 'https://via.placeholder.com/300x150?text=Imagen+no+disponible';
      }}
    />
  ) : (
    <div className="image-placeholder">
      {item.name.split(' ')[0]} {/* Muestra la primera palabra del nombre */}
    </div>
  )}
</div>
                <div className="product-info">
                  <h3>{item.name}</h3>
                  <p className="product-description">{item.description}</p>
                  <div className="product-footer">
                    <span className="product-price">${item.price.toFixed(3)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subcategorías */}
        <div className="bento-subcategories">
          <h2>Subcategorías</h2>
          <div className="subcategory-list">
            {selectedCategory?.subcategories?.map(sub => (
              <button
                key={sub.id}
                className={`subcategory-btn ${activeSubcategory === sub.id ? 'active' : ''}`}
                onClick={() => setActiveSubcategory(sub.id)}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Client;