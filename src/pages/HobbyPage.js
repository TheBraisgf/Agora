import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Card from "../components/Card";

function HobbyPage() {
  const [hobbies, setHobbies] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // Función para obtener los hobbies desde la API
    const fetchHobbies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/hobbies");
        if (response.ok) {
          const data = await response.json();
          setHobbies(data);
        } else {
          console.error("Error al obtener los hobbies");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/totalUsers");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Error al obtener los Users");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchHobbies();
    fetchUsers();
  }, []);

  return (
    <main className="hobbyPage">
      <NavBar />
      <h1>
        Nuestros Hobbies! Actualmente: {hobbies.length} hobbies y {users.length}{" "}
        miembros
      </h1>
      <div className="hobbies-grid">
        {hobbies.map((hobby) => (
          <Card
            key={hobby.id}
            title={hobby.nombre}
            image={hobby.imagen} // Asegúrate de que este campo existe en la base de datos
            frequency={hobby.frecuencia} // Asegúrate de que este campo existe en la base de datos
            location={hobby.ubicacion} // Asegúrate de que este campo existe en la base de datos
            timesDone={hobby.veces_realizado} // Asegúrate de que este campo existe en la base de datos
            interestedMembers={hobby.usuarios_interesados} // Asegúrate de que este campo existe en la base de datos
          />
        ))}
      </div>
    </main>
  );
}

export default HobbyPage;
