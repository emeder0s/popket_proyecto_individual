import React, { useState } from "react";

function SpaceBox() {
  return (
    <div className="space-box">
        <div>
            <img src={`http://localhost:5000/uploads/3/beer.png`}></img>
        </div>
        <div className="space-name">EL nombre del Espacio es un poco largo</div>
    </div>   
  );
}

export default SpaceBox;