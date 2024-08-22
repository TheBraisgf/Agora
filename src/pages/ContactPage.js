//Components
import React, { useState } from "react";
import NavBar from "../components/NavBar";

function ContactPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("¡Correo enviado con éxito!");
        setFormData({ nombre: "", email: "", mensaje: "" }); // Limpiar el formulario
      } else {
        alert("Hubo un problema al enviar el correo.");
      }
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      alert("Error al enviar el correo. Intenta de nuevo.");
    }
  };

  return (
    <main className="contactPage">
      <NavBar />
      <h1>Contacto</h1>

      <section className="contact-info">
        <h2>Redes Sociales</h2>
        <ul>
          <li>
            <a
              href="https://facebook.com/tuGrupo"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com/tuGrupo"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/tuGrupo"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </li>
        </ul>

        <h2>Email</h2>
        <p>
          Para cualquier consulta, escríbenos a:{" "}
          <a href="mailto:tugrupo@email.com">tugrupo@email.com</a>
        </p>

        <h2>Grupo de WhatsApp</h2>
        <p>
          Únete a nuestro grupo de WhatsApp para mantenerte informado:{" "}
          <a
            href="https://chat.whatsapp.com/tuGrupo"
            target="_blank"
            rel="noopener noreferrer"
          >
            Enlace al grupo
          </a>
        </p>
      </section>

      <section className="contact-form">
        <h2>Envíanos un mensaje</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Mensaje:
            <textarea
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">Enviar</button>
        </form>
      </section>
    </main>
  );
}

export default ContactPage;
