import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Restaurante App. Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="/about">Acerca de</a>
          <a href="/contact">Contacto</a>
          <a href="/privacy">Política de privacidad</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;