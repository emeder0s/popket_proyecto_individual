import React, { useState }  from "react";
import { useNavigate } from 'react-router-dom';
import { postFetch } from '../../helpers/fetchs';
import { checkAuth } from '../../helpers/checkAuth';
import '../../style/body.css';


function AddProduct(props) {
    var auth = checkAuth();
    const idSpace= props.idSpace;
    const [space, setSpace] = useState(props.space);
    const [image, setImage] = useState();
    const [product, setProduct] = useState();
    const [msn,setMsn] =  useState("");

    const handleImage = (e) => {
        const image = e.target.files[0];
        setImage(image);
    }

    const uploadImage = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", image);
        let data = {
            method: "POST",
            body: formData,
            mode: "cors",
            headers: {id_space:space},
        };

        fetch("/upload-image", data)
            .then((res) => res.json())
            .then(async (res) => {
                await newProduct(e,res.path)
            });
    }

    const newProduct = async (e,path) =>{
        e.preventDefault();
        var data = {product_name:e.target.product_name.value,description:e.target.description.value,price:e.target.price.value,image:path,fk_id_space:space};
        await postFetch("/new-product", data)
         .then((res) => res.json(res))
         .then(res=>{
             if(res){
                setMsn("Producto añadido correctamente");
                setProduct(res)
                document.getElementById("new-product-form").reset();
             }
         })
    }

    return(
        <div className="personal-data-form">
            {product ?
            <div>
            <div className="view-product">
            <div>
                <div className="img-container">
                    <img className="new-product" src={`http://localhost:5000/uploads/${idSpace}/${product.image}`}></img>
                </div>
                <div>
                    <table className="inserted-product">
                        <tbody>
                            <tr>
                                <td className="label">Nombre</td>
                                <td className="value">{product.product_name}</td>
                            </tr>
                            <tr>
                                <td className="label">Descripción</td>
                                <td className="value">{product.description}</td>
                            </tr>
                            <tr>
                                <td className="label">Precio</td>
                                <td className="value">{product.price}€</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <p id="sucess-message">{msn}</p>
            </div>
            <h5>¿Quieres añadir otro?</h5>
            </div>
            :""}
            <div className="new-product">
                <form id="new-product-form" onSubmit={uploadImage} encType="multipart/form-data" method="POST">
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

export default AddProduct;