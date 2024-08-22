import React from "react";

function Modal({ hobby, onClose, onAdd }) {
  if (!hobby) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>{hobby.name}</h2>
        <img src={hobby.image} alt={hobby.name} className="modal-image" />
        <p>{hobby.description}</p>
        <p>Location: {hobby.location}</p>
        <p>Veces realizado: {hobby.times_done}</p>
        <button className="modal-add" onClick={onAdd}>
          Add Hobby
        </button>
      </div>
    </div>
  );
}

export default Modal;
