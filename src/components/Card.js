import React from "react";

function Card({ title, image, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={image} alt={title} className="card-image" />
      <h3 className="card-title">{title}</h3>
    </div>
  );
}

export default Card;
