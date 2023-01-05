import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function IntroContainer() {
  const navigate = useNavigate();
  const redirect = () => {
    navigate("/espacios")
 
  }

  return (
    <div className="intro-container">
      <div>
        <h2>POPKET</h2>
        <h2 className="subtitle">Creaciones originales a tu alcance</h2>
        <button onClick={redirect}>Todos los Espacios ¡Cotillea!</button>
      </div>
    </div>
      
  );
}

export default IntroContainer;