import React, { useState, useEffect } from "react";
//Components
import NavBar from "../components/NavBar";

function RegisterPage() {
  const [formData, setFormData] = useState({
    nombre_real: "",
    usuario: "",
    contrasena: "",
    repetirContrasena: "",
    descripcion: "",
    foto: "",
    hobbies: [],
  });
  const [hobbiesList, setHobbiesList] = useState([]);
  const [showPassword, setShowPassword] = useState(false); // Para mostrar/ocultar contraseña

  useEffect(() => {
    // Fetch para obtener los hobbies disponibles desde el servidor
    const fetchHobbies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/hobbies", {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          }),
        });

        if (response) {
          const data = await response.json();
          setHobbiesList(data);
        } else {
          console.error("Error al obtener los hobbies");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchHobbies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const updatedHobbies = checked
        ? [...prevState.hobbies, value]
        : prevState.hobbies.filter((hobby) => hobby !== value);

      return { ...prevState, hobbies: updatedHobbies };
    });
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.contrasena !== formData.repetirContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      // Enviar los datos al servidor usando fetch
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registro exitoso!");
      } else {
        const errorText = await response.text();
        throw new Error(errorText || "Error desconocido");
      }
    } catch (error) {
      console.error("Hubo un error al registrar:", error);
      alert("Error al registrar. Por favor, intente de nuevo.");
    }
  };

  return (
    <div className="register-page">
      <NavBar />
      <h1>Registro de Miembros</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre Real:
          <input
            type="text"
            name="nombre_real"
            value={formData.nombre_real}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Usuario:
          <input
            type="text"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Contraseña:
          <input
            type={showPassword ? "text" : "password"}
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Repetir Contraseña:
          <input
            type={showPassword ? "text" : "password"}
            name="repetirContrasena"
            value={formData.repetirContrasena}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={handlePasswordToggle}
          />
          <span> Ver Contraseña</span>
        </label>
        <label>
          Descripción:
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </label>
        <label>
          Foto (URL):
          <input
            type="text"
            name="foto"
            value={formData.foto}
            onChange={handleChange}
          />
        </label>
        <fieldset>
          <legend>Selecciona tus hobbies favoritos:</legend>
          <div className="hobbies-grid">
            {hobbiesList.map((hobby) => (
              <label key={hobby.id}>
                <input
                  type="checkbox"
                  value={hobby.id}
                  checked={formData.hobbies.includes(hobby.id.toString())}
                  onChange={handleCheckboxChange}
                />
                {hobby.nombre}
              </label>
            ))}
          </div>
        </fieldset>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default RegisterPage;
