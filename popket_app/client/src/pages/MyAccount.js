import React, { useState }  from "react";
import { Link } from 'react-router-dom';
import { checkAuth } from '../helpers/checkAuth';
import PersonalDataForm from '../components/account/PersonalDataForm';
import AddressForm from '../components/account/AddressForm';
import PasswordForm from '../components/account/PasswordForm';
import Orders from '../components/account/Orders';
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

    fetch("/is-spacer")
    .then((res) => res.json(res))
    .then(res=>{
        if(res){
            var isSpacer= true;
        }else{
            var isSpacer= false;
        } 
    });
    
    return(
        <div className="page-content page-content-account">
            <div className="sidebar">
                <ul className="all-users">
                   <li id="personal-data" className="menu-option active" onClick={() => activeLi("personal-data")}>Datos Personales</li>
                   <li id="address" className="menu-option" onClick={() => activeLi("address")}>Dirección</li>
                   <li id="password" className="menu-option" onClick={() => activeLi("password")}>Contraseña</li>
                   <li id="orders" className="menu-option" onClick={() => activeLi("orders")}>Pedidos</li> 
                   {isSpacer ? <li><Link to='/' className="nav-link">Editar Espacio</Link></li> : ""}
                </ul>
            </div>
            <div className="sidebar-content">
                {activeContent == "personal-data" ? <div id="personal-data-content" className="personal-data" ><PersonalDataForm isSpacer={isSpacer}></PersonalDataForm></div> : ""}
                {activeContent == "address" ? <div id="address-content" className="address" ><AddressForm></AddressForm></div> : ""}
                {activeContent == "password" ? <div id="password-content" className="password"><PasswordForm></PasswordForm></div> : ""}
                {activeContent == "orders" ? <div id="orders-content"className="orders" ><Orders></Orders></div> : ""}     
            </div>
        </div>
    )
}

export default MyAccount;