import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { checkAuth } from '../helpers/checkAuth';
import UserContext from "../components/context/UserContext";
import Cookies from 'universal-cookie';
import '../style/navigation.css';

export const Navigation = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  var auth = checkAuth();
  var user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  
  function handleLogout(){
    fetch('/logout')
    .then(res=> res.json())
    .then(res => {
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
        Bienvenida, {user.first_name}
        <Link onClick={handleLogout}>Log out</Link>
      </div> 
      :<div>
        <NavLink to='/registro' className="nav-link">Regístrate</NavLink>
        <NavLink to='/login' className="nav-link">Log in</NavLink>
      </div>}
    </nav>
  )

}

