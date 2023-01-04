import React, { useState }  from "react";
import { useNavigate } from 'react-router-dom';
import { postFetch } from '../../helpers/fetchs';
import { checkAuth } from '../../helpers/checkAuth';
import '../../style/body.css';

function NewProduct() {
    var auth = checkAuth();
    const [space, setSpace] = useState();
    const [image, setImage] = useState();

    fetch("/get-space-by-user")
    .then((res) => res.json(res))
    .then(res=>{
        setSpace(res);
    });

    const handleImage = (e) => {
        const image = e.target.files[0];
        console.log( URL.createObjectURL(image));
        setImage(image);
    }

    const uploadImage = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", image);
        console.log(space);
        let data = {
            method: "POST",
            body: formData,
            mode: "cors",
            headers: {id_space:space},
        };

        fetch("/upload", data)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            });
    }

    const newP = async e =>{
        e.preventDefault();
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
        <div className="personal-data-form">
            <h4>Añade un producto</h4>
            <div className="new-product">
                <form onSubmit={uploadImage} encType="multipart/form-data" method="POST">
                    <input type="text" name='product_name' placeholder='Nombre del producto' required></input>
                    <textarea name="description" placeholder="Descripción"></textarea> 
                    <input type="text" name="price" placeholder="Precio. Ej: 16.50"></input>
                    <p>Sube una imagen del producto</p>
                    <input type="file" name='image' onChange={handleImage} required></input>
                    <button type="submit">Añadir</button>
                </form>   
            </div>
        </div>
    )
}

export default NewProduct;