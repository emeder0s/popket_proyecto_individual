import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from "../components/context/UserContext";
import Cookies from 'universal-cookie';
import '../style/navigation.css';

export const Navigation = () => {
  var auth =JSON.parse(localStorage.getItem("user"));
  const cookies = new Cookies();
  const navigate = useNavigate();

  function handleLogout(){
    fetch('/logout')
    .then(res=> res.json())
    .then(res => {
      console.log(res);
      if(res){
        cookies.remove('session', { path: '/' });
        localStorage.clear();
        navigate("/");
      }
    });
  }

  return(
    <nav>
      <NavLink to='/' className="logo-link"><h1>POPKET</h1></NavLink>
      {auth ?
      <div>
        Bienvenida, {auth.first_name}
        <Link onClick={handleLogout}>Log out</Link>
      </div> 
      :<div>
        <NavLink to='/login' className="login-link">Regístrate</NavLink>
        <NavLink to='/login' className="login-link">Log in</NavLink>
      </div>}
    </nav>
  )

}

