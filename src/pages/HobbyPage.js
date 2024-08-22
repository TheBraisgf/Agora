// HobbyPage.jsx
import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import Modal from "../components/CardModal"; // Importar el componente Modal

function HobbyPage() {
  const [hobbies, setHobbies] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedHobby, setSelectedHobby] = useState(null); // Estado para el hobby seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal

  useEffect(() => {
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
        const response = await fetch("http://localhost:5000/api/users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Error al obtener los usuarios");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchHobbies();
    fetchUsers();
  }, []);

  const handleCardClick = (hobby) => {
    console.log("Card clicked:", hobby); // Añadir console.log para verificar clic
    setSelectedHobby(hobby);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHobby(null);
  };

  const handleAddHobby = () => {
    alert("Hobbie agregado");
  };

  return (
    <main className="hobbyPage">
      <NavBar />

      <h1>
        Nuestros Hobbies! Actualmente: <span>{hobbies.length}</span> hobbies y
        <span>{users.length}</span> miembros
      </h1>
      <div className="hobbies-grid">
        {hobbies.map((hobby) => (
          <Card
            key={hobby._id}
            title={hobby.name}
            image={hobby.image}
            onClick={() => handleCardClick(hobby)} // Agregar onClick para abrir el modal
          />
        ))}
      </div>

      {isModalOpen && (
        <Modal
          hobby={selectedHobby}
          onClose={handleCloseModal}
          onAdd={handleAddHobby}
        />
      )}
    </main>
  );
}

export default HobbyPage;
