import React, { useState, useEffect } from "react";
import SpaceBox from "../components/allspaces/SpaceBox";
import { Link } from 'react-router-dom';
import '../style/home.css';
import '../style/all-space.css';

function AllSpaces(){
    var [spaces,setSpaces] = useState();

    const getSpaces = () => {
        fetch("/all-spaces")
        .then((res) => res.json(res))
        .then(res=>{
            console.log(res);
            setSpaces(res);
        });
    }

    useEffect(()=>{
        getSpaces();
    },[]);


  return (
    <div className="page-content page-content-all-spaces">
        <div className="search-container"><input placeholder="Buscar un espacio"></input></div>
        { spaces ? 
            <div className="spaces">
                <Link to='/mi-cuenta' className="nav-link"><SpaceBox></SpaceBox></Link>
                <Link to='/mi-cuenta' className="nav-link"><SpaceBox></SpaceBox></Link>
                <Link to='/mi-cuenta' className="nav-link"><SpaceBox></SpaceBox></Link>
                <Link to='/mi-cuenta' className="nav-link"><SpaceBox></SpaceBox></Link>
                <Link to='/mi-cuenta' className="nav-link"><SpaceBox></SpaceBox></Link>
                <Link to='/mi-cuenta' className="nav-link"><SpaceBox></SpaceBox></Link>
                <Link to='/mi-cuenta' className="nav-link"><SpaceBox></SpaceBox></Link>
            </div>
         : ""}
    </div>   
  );
}

export default AllSpaces;