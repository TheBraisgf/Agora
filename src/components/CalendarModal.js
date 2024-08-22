import React from "react";

const Modal = ({ event, onClose, onRegisterSuccess }) => {
  if (!event) return null;

  const handleRegister = async () => {
    if (!event) return;

    try {
      const response = await fetch(
        `https://agoraback.onrender.com/api/events/${event.id}/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // Si solo necesitas incrementar el contador, el cuerpo puede estar vacío
          body: JSON.stringify({}),
        }
      );

      if (response.ok) {
        alert("Te has apuntado al evento");
        // Llama al callback para actualizar la lista de eventos en el componente padre
        if (onRegisterSuccess) onRegisterSuccess();
        onClose();
      } else {
        alert("Error al apuntarse al evento");
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("Error al apuntarse al evento");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>{event.name}</h2>
        <img
          src={event.hobby?.image} // Usa el operador opcional de encadenamiento en caso de que `hobby` sea null o undefined
          alt={event.name}
          className="modal-image"
        />
        <p>
          <strong>Fecha y Hora:</strong>{" "}
          {new Date(event.start).toLocaleString()}
        </p>
        <p>
          <strong>Ubicación:</strong> {event.location}
        </p>
        <p>
          <strong>Usuarios Apuntados:</strong> {event.totalUsers}
        </p>
        <button className="register-button" onClick={handleRegister}>
          Apuntarse
        </button>
      </div>
    </div>
  );
};

export default Modal;
