import React, { useState, useEffect }  from "react";
import { Link } from 'react-router-dom';
import { checkAuth } from '../helpers/checkAuth';
import PersonalDataForm from '../components/account/PersonalDataForm';
import AddressForm from '../components/account/AddressForm';
import PasswordForm from '../components/account/PasswordForm';
import Orders from '../components/account/Orders';
import RequestOrders from '../components/account/RequestOrders';
import '../style/body.css';
import '../style/my-account.css';

function MyAccount() {
    var auth = checkAuth();
    const [viewIsSpacer, setViewIsSpacer] = useState(JSON.parse(localStorage.getItem("user")).isSpacer);
    const [activeContent, setActiveContent] = useState("personal-data");
    const [requestOrders,setRequestOrders] = useState();
    const activeLi = (optionId) => {
        var activeOne = document.getElementsByClassName("menu-option active")[0];
         if (activeOne.getAttribute("id") != optionId){
              activeOne.classList.remove("active");
              document.getElementById(optionId).classList.add("active");
              setActiveContent(optionId);
          }
    }

    const getOrdersRequest = async() =>{
        var spacer = JSON.parse(localStorage.getItem("user")).id;
        console.log(spacer);
        // await fetch(`/get-orders-request/${spacer}`)
        // .then((res) => res.json(res))
        // .then(res=>{
        //     console.log(res);   
        // })

    }

    useEffect(()=>{
        if (viewIsSpacer){
            getOrdersRequest();
        }
    },[])

    return(
        <div className="page-content page-content-account">
            <div className="sidebar">
                <ul className="all-users">
                   <li id="personal-data" className="menu-option active" onClick={() => activeLi("personal-data")}>Datos Personales</li>
                   <li id="address" className="menu-option" onClick={() => activeLi("address")}>Dirección</li>
                   <li id="password" className="menu-option" onClick={() => activeLi("password")}>Contraseña</li>
                   <li id="request-orders" className="menu-option" onClick={() => activeLi("request-orders")}>Pedidos</li> 
                   {viewIsSpacer ? <li id="request-orders" className="menu-option" onClick={() => activeLi("request-orders")}>Solicitudes de Pedido {requestOrders > 0 ? <span>requestOrders</span>:""}</li> : ""}
                   {viewIsSpacer ? <li><Link to='/editar-space' className="nav-link nav-link-space">Editar Espacio</Link></li> : ""}
                </ul>
            </div>
            <div className="sidebar-content">
                {activeContent == "personal-data" ? <div id="personal-data-content" className="personal-data"><PersonalDataForm isSpacer={viewIsSpacer}></PersonalDataForm></div> : ""}
                {activeContent == "address" ? <div id="address-content" className="address" ><AddressForm isSpacer={viewIsSpacer}></AddressForm></div> : ""}
                {activeContent == "password" ? <div id="password-content" className="password"><PasswordForm isSpacer={viewIsSpacer}></PasswordForm></div> : ""}
                {activeContent == "orders" ? <div id="orders-content" className="orders" ><Orders isSpacer={viewIsSpacer}></Orders></div> : ""}
                {activeContent == "request-orders" ? <div id="orders-content" className="request-orders"><RequestOrders isSpacer={viewIsSpacer}></RequestOrders></div> : ""}         
            </div>
        </div>
    )
}

export default MyAccount;