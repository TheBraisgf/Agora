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
        <Link to="/activities">
          <p>Hobbies</p>
        </Link>
      </div>
      <div>
        <Link to="/members">
          <p>Actividades</p>
        </Link>
      </div>
      <div>
        <Link to="/contact">
          <p>Contacto</p>
        </Link>
      </div>
    </header>
  );
}

export default NavBar;
