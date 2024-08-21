import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <header className="navbar">
      <div>
        <Link to="/home">
          <p>Inicio</p>
        </Link>
      </div>
      <div>
        <Link to="/hobbies">
          <p>Hobbies</p>
        </Link>
      </div>
      <div>
        <Link to="/actividades">
          <p>Actividades</p>
        </Link>
      </div>

      <div>
        <Link to="/registro">
          <p>Registro</p>
        </Link>
      </div>
      <div>
        <Link to="/contacto">
          <p>Contacto</p>
        </Link>
      </div>
    </header>
  );
}

export default NavBar;
