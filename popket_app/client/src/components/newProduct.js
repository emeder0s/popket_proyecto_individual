import React, { useState }  from "react";
import { useNavigate } from 'react-router-dom';
import { postFetch } from '../helpers/fetchs';
import { checkAuth } from '../helpers/checkAuth';
import { useContext } from 'react';
import UserContext from "../components/context/UserContext";
import Cookies from 'universal-cookie';
import '../style/body.css';

function NewProduct() {
    var auth = checkAuth();
    const [space, setSpace] = useState();
    const [image, setImage] = useState();

    fetch("/get-space-by-user")
    .then((res) => res.json(res))
    .then(res=>{
        setSpace(res);
    });

    const imageOnChange = e => {
        console.log(e.target);
       setImage(e.target.image.value)
    }

    const newP = async e =>{
        e.preventDefault();
        console.log("entro");
        var data = {product_name:e.target.product_name.value,description:e.target.description.value,price:e.target.price.value,image:e.target.image,fk_id_space:space};
        await postFetch("/new-product", data)
        .then((res) => res.json(res))
        .then(res=>{
            if(res){
                console.log(res);
            }
        })
    }

    return(
        <div className="page-content">
            <div className="new-product">
                <form onSubmit={newP} encType="multipart/form-data">
                    <input type="text" name='product_name' placeholder='Nombre del product' required></input>
                    <textarea name="description" placeholder="Descripción"></textarea> 
                    <input type="text" name="price" placeholder="Precio. Ej: 16.50"></input>
                    <p>Sube una imagen del producto</p>
                    <input type="file" name='image' onChange={imageOnChange}required></input>
                    <button type="submit">Añadir</button>
                </form>   
            </div>
        </div>
    )
}

export default NewProduct;