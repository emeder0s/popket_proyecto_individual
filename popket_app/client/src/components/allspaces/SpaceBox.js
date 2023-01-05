import React, { useState } from "react";

function SpaceBox(props) {
  const space = props.space;
  return (
    <div className="space-box">
        <div>
            <img src={`http://localhost:5000/uploads/1/space.png`}></img>
        </div>
        <div className="space-name">{space.name_space}</div>
    </div>   
  );
}

export default SpaceBox;