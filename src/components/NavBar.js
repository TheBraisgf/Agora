import React, { useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="menu-icon" onClick={toggleMenu}>
          {/* Icono de hamburguesa */}
          <span className={`burger-line ${isOpen ? "open" : ""}`}></span>
          <span className={`burger-line ${isOpen ? "open" : ""}`}></span>
          <span className={`burger-line ${isOpen ? "open" : ""}`}></span>
        </div>

        <nav className={`nav-links ${isOpen ? "open" : ""}`}>
          <Link to="/home">
            <p>Inicio</p>
          </Link>
          <Link to="/hobbies">
            <p>Hobbies</p>
          </Link>
          <Link to="/actividades">
            <p>Actividades</p>
          </Link>
          <Link to="/registro">
            <p>Registro</p>
          </Link>
          <Link to="/contacto">
            <p>Contacto</p>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
