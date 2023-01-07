import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { checkAuth } from '../helpers/checkAuth';
import UserContext from "../components/context/UserContext";
import Cookies from 'universal-cookie';
import '../style/navigation.css';

export const Navigation = (props) => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  var auth = checkAuth();
  var user = JSON.parse(localStorage.getItem("user"));


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

  const handleCart = () => {
    props.viewCart ? props.setViewCart(false) : props.setViewCart(true);
  }

  return(
    <nav>
      <NavLink to='/' className="logo-link"><h1>POPKET</h1></NavLink>
      {auth ?
      <div>
        <NavLink to='/espacios' className="nav-link nav-link-margin-right">Espacios</NavLink>
        <NavLink to='/mi-cuenta' id="user-name" className="nav-link">Cuenta</NavLink>
        <Link onClick={handleLogout}>Log out</Link>
        <Link onClick={handleCart} className="nav-link" id="nav-link-cart">Carrito ()</Link>
      </div> 
      :
      <div>
        <NavLink to='/espacios' className="nav-link">Espacios</NavLink>
        <NavLink to='/registro' className="nav-link">Regístrate</NavLink>
        <NavLink to='/login' className="nav-link">Log in</NavLink>
        <Link onClick={handleCart} className="nav-link" id="nav-link-cart">Carrito ()</Link>
      </div>}
    </nav>
  )

}

