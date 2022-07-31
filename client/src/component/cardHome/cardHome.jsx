import React from "react";
import "./card.css";

const CardHome = ({ id, name, image, temperaments, weight }) => {
  return (
    <div className="cardDetail">
      <div>
        <span>{id}</span>
      </div>
<div className="nombre">
          <span>{name}</span>
        </div>
          <img  src={image} alt={`Imagen de ${name}`} className = "imgCard"/>
       

        <div className="pesoCard">
          <span>peso: <br />{weight}</span>
        </div>

        <div className="tempCard">
          {temperaments.map((e) => {
            return <p key={e}>{`${e}`}</p>;
          })}
        </div>
    </div>
  );
};

export default CardHome;
