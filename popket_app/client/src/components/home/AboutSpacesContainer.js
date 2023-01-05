import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function AboutSpacesContainer() {
  const navigate = useNavigate();
  const redirect = () => {
    navigate("/registro-spacer")
 
  }

  return (
    <div className="about-spaces-container">
      <h2>¿Quieres ser SPACER en POPKET?</h2>
      <div>
        <button onClick={redirect}>Más info</button>
      </div>
    </div>
      
  );
}

export default AboutSpacesContainer;