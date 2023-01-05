import React, { useState, useEffect } from "react";
import SpaceBox from "../components/allspaces/SpaceBox";
import { Link, NavLink } from 'react-router-dom';
import '../style/home.css';
import '../style/all-space.css';

function AllSpaces(){
    var [spaces,setSpaces] = useState();

    const getSpaces = () => {
        fetch("/all-spaces")
        .then((res) => res.json(res))
        .then(res=>{
            if (res.length > 0){
                setSpaces(res);
            }else{
                document.getElementById("no-order-message").style.display="block";
            }           
        });
    }

    useEffect(()=>{
        getSpaces();
    },[]);

    const redirect = () => {

    }


  return (
    <div className="page-content page-content-all-spaces">
        <div className="search-container"><input placeholder="Buscar un espacio"></input></div>
        <p id="no-order-message" style={{display: "none"}}>Ups!! Todavía no hay ningún espacio creado. ¿Quieres ser el primero? <NavLink to='/registro-spacer' id="user-name" className="nav-link">Aquí</NavLink></p>
        { spaces ? 
            <div className="spaces">
                {spaces.map((space, i) => {
                    return (
                        <Link to={`/space/${space}`} className="nav-link"><SpaceBox space={space}></SpaceBox></Link>
                    )
                })}
            </div>
         : ""}
    </div>   
  );
}

export default AllSpaces;