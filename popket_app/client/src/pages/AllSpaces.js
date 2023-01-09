import React, { useState, useEffect } from "react";
import SpaceBox from "../components/allspaces/SpaceBox";
import {Footer} from "../components/Footer"
import { Link, NavLink } from 'react-router-dom';
import '../style/body.css';
import '../style/home.css';
import '../style/all-space.css';

function AllSpaces(){
    var [spaces,setSpaces] = useState();
    var [search,setSearch] = useState();

    const getSpaces = () => {
        fetch("/all-spaces")
        .then((res) => res.json(res))
        .then(res=>{
            if (res.length > 0){
                setSpaces(res);
                var results = res.map(() =>{return true})
                setSearch(results);
            }else{
                document.getElementById("no-order-message").style.display="block";
            }           
        });
    }

    useEffect(()=>{
        getSpaces();
    },[]);

    const searchSpace = (e) => {
        if(e.key === 'Enter'){
            var value = document.getElementById("search-box").value.toLowerCase();
            var results = spaces.map((space,i) =>{
                 var name = space.name_space.toLowerCase(); 
                 if (name.includes(value)){
                     return true
                 }else{
                    return false
                }
            })
            setSearch(results);
        }
    }

  return (
    <div className="page-content page-content-all-spaces">
        <div className="search-container"><input id="search-box" placeholder="Buscar un espacio" onKeyDown={searchSpace}></input></div>
        <p id="no-order-message" style={{display: "none"}}>Ups!! Todavía no hay ningún espacio creado. ¿Quieres ser el primero? <NavLink to='/registro-spacer' id="user-name" className="nav-link">Aquí</NavLink></p>
        { spaces ? 
            <div className="spaces">
                {spaces.map((space, i) => {
                    return search[i] ? <Link to={`/espacio/${space.id}`} className="nav-link" key={i}><SpaceBox space={space}></SpaceBox></Link> : ""
                })}
            </div>
         : ""}
        
    </div>   
  );
}

export default AllSpaces;