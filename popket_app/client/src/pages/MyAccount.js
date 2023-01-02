import React, { useState }  from "react";
import { Link } from 'react-router-dom';
import { checkAuth } from '../helpers/checkAuth';
import '../style/body.css';
import '../style/my-account.css';

function MyAccount() {
    var auth = checkAuth();
    const [activeContent, setActiveContent] = useState("personal-data");
    const activeLi = (optionId) => {
        var activeOne = document.getElementsByClassName("menu-option active")[0];
         if (activeOne.getAttribute("id") != optionId){
              activeOne.classList.remove("active");
              document.getElementById(optionId).classList.add("active");
              setActiveContent(optionId);
          }
    }
    
    return(
        <div className="page-content page-content-account">
            <div className="sidebar">
                <ul className="all-users">
                   <li id="personal-data" className="menu-option active" onClick={() => activeLi("personal-data")}>Datos Personales</li>
                   <li id="address" className="menu-option" onClick={() => activeLi("address")}>Dirección</li>
                   <li id="password" className="menu-option" onClick={() => activeLi("password")}>Contraseña</li>
                   <li id="orders" className="menu-option" onClick={() => activeLi("orders")}>Pedidos</li>  
                </ul>
                <ul>
                    <li><Link to='/' className="nav-link">Editar Espacio</Link></li>
                </ul>
            </div>
            <div className="sidebar-content">
                {activeContent == "personal-data" ? <div id="personal-data-content" className="personal-data" >Datos personales</div> : ""}
                {activeContent == "address" ? <div id="address-content" className="address" > address</div> : ""}
                {activeContent == "password" ? <div id="password-content" className="password">contrañsea</div> : ""}
                {activeContent == "orders" ? <div id="orders-content"className="orders" >pedidos</div> : ""}     
            </div>
        </div>
    )
}

export default MyAccount;