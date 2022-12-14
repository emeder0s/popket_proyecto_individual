import React, { useState, useEffect }  from "react";
import { useNavigate, Link } from 'react-router-dom';
import { checkAuth } from '../helpers/checkAuth';
import SpaceData from '../components/editspace/SpaceData';
import NewProduct from '../components/editspace/NewProduct'
import ManageProducts from '../components/editspace/ManageProducts'
import '../style/body.css';
import '../style/my-account.css';
import '../style/edit-space.css';

function EditSpace() {
    var auth = checkAuth();
    const [space, setSpace] = useState();
    const navigate = useNavigate();
    const [activeContent, setActiveContent] = useState("space");
    const activeLi = (optionId) => {
        var activeOne = document.getElementsByClassName("menu-option active")[0];
         if (activeOne.getAttribute("id") != optionId){
              activeOne.classList.remove("active");
              document.getElementById(optionId).classList.add("active");
              setActiveContent(optionId);
          }
    }
    useEffect(()=>{
        const checkSpacer = async () =>{
            await fetch("/is-spacer")
            .then((res) => res.json(res))
            .then(res=>{
                if (!res){
                    navigate("/");
                }
            });
        }

        const getSpace = async () =>{
            await fetch("/show-space-by-spacer")
            .then((res) => res.json(res))
            .then(res=>{
                setSpace(res);
            }) 
        }
        checkSpacer();
        getSpace();
    },[]);
    
    return(
        <div className="page-content page-content-account">
            <div className="sidebar">
                <ul className="all-users">
                   <li id="space" className="menu-option active" onClick={() => activeLi("space")}>Espacio</li>
                   <li id="manage-products" className="menu-option" onClick={() => activeLi("manage-products")}>Gestionar Productos</li>
                   <li id="add-product" className="menu-option" onClick={() => activeLi("add-product")}>Añadir Producto</li>
                   <li><Link to='/mi-cuenta' className="nav-link">Mi cuenta</Link></li>
                </ul>
            </div>
            <div className="sidebar-content">
                {activeContent == "space" ? <div id="space-content" className="space"><SpaceData space={space}></SpaceData></div> : ""}
                {activeContent == "add-product" ? <div id="add-product-content" className="add-product" ><NewProduct idSpace={space.id}></NewProduct></div> : ""}
                {activeContent == "manage-products" ? <div id="add-product-content" className="manage-products" ><ManageProducts idSpace={space.id}></ManageProducts></div> : ""}
            </div>
        </div>
    )
}

export default EditSpace;