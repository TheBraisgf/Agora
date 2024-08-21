import React from "react";

const Card = ({
  title,
  image,
  frequency,
  location,
  lastDate,
  timesDone,
  interestedMembers,
}) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p>
          <strong>Frecuencia:</strong> {frequency}
        </p>
        <p>
          <strong>Ubicación:</strong> {location}
        </p>
        <p>
          <strong>Última vez:</strong> {lastDate}
        </p>
        <p>
          <strong>Veces realizado:</strong> {timesDone}
        </p>
        <p>
          <strong>Miembros interesados:</strong> {interestedMembers}
        </p>
      </div>
    </div>
  );
};

export default Card;
