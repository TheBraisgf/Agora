import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import hobbiesData from "../assets/hobbiesMock.json"; // Importar el JSON con los hobbies

function HobbyPage() {
  const [hobbies, setHobbies] = useState([]);

  useEffect(() => {
    // Simulamos la carga de datos desde un archivo local
    setHobbies(hobbiesData);
  }, []);

  return (
    <main className="hobbyPage">
      <NavBar />
      <h1>Nuestros Hobbies</h1>
      <div className="hobbies-grid">
        {hobbies.map((hobby, index) => (
          <Card
            key={index}
            title={hobby.title}
            image={hobby.image}
            frequency={hobby.frequency}
            location={hobby.location}
            lastDate={hobby.lastDate}
            timesDone={hobby.timesDone}
            interestedMembers={hobby.interestedMembers}
          />
        ))}
      </div>
    </main>
  );
}

export default HobbyPage;
