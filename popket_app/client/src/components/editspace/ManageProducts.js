import React, { useEffect, useState }  from "react";
import { useNavigate } from 'react-router-dom';
import { postFetch } from '../../helpers/fetchs';
import '../../style/body.css';

function ManageProducts(props) {
    const idSpace= props.idSpace;
    var [products,setProducts] = useState();
    var [product,setProduct] = useState();
    var [image,setImage] = useState();
    var [msn,setMsn] = useState();

    const getProducts = () => {
        fetch("/get-products-by-space/"+ props.idSpace)
        .then((res) => res.json(res))
        .then(res=>{
            if(res.length > 0){
                
                setProducts(res);
            }   
        });
    }
    useEffect(()=>{
        getProducts();
    },[]);

    const deleteProduct = (id,name) => {
        if (window.confirm(`¿Seguro que quieres borrar el producto ${name}?`)){
            fetch("/delete-product/"+ id, { method: 'DELETE' })
                .then((res) => res.json(res))
                .then(res=>{
                    getProducts();
            });
        }
    }

    const editProduct = async (e) => {
        e.preventDefault();
        document.getElementById("sucess-message").style.display="none";
        var data = {id:product.id,product_name:e.target.product_name.value,description:e.target.description.value,price:e.target.price.value};
        await postFetch("/edit-product", data)
        .then((res) => res.json(res))
        .then(res=>{
            setMsn("Datos editados correctamente");
            document.getElementById("sucess-message").style.display="block";
        })  
    }

    const selectedToEdit = (product) => {
        setProduct(product);
    }

    const handleImage = (e) => {
        const image = e.target.files[0];
        setImage(image);
    }

    const editImage = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", image);
        let data = {
            method: "POST",
            body: formData,
            mode: "cors",
            headers: {id_space:idSpace},
        };

        fetch("/upload-image", data)
            .then((res) => res.json())
            .then(async (res) => {
                await editOnlyImg(e,res.path)
            });
    }

    const editOnlyImg = async (e,path) => {
        e.preventDefault();
        var data = {id:product.id,image:path};
        await postFetch("/edit-product-image", data)
         .then((res) => res.json(res))
         .then(res=>{
             if(res){
                setProduct(res);
             }
         })
    }

    const back = () => {
        setProduct("");
    }

    return(
        <div className="personal-data-form">
            {product ? 
            <div>
                <div className="edit-product">
                <p className="title">Edita los datos del producto</p>
                <p id="sucess-message" style={{display: "none"}}>{msn}</p>
                <form id="edit-product-form" onSubmit={editProduct} encType="multipart/form-data" method="POST">
                    <input type="text" name='product_name' placeholder='Nombre del producto' defaultValue={product.product_name} required></input>
                    <textarea name="description" placeholder="Descripción" defaultValue={product.description}></textarea> 
                    <input type="text" name="price" placeholder="Precio. Ej: 16.50" defaultValue={product.price}></input>

                    <button type="submit">Editar</button>
                </form> 
                <br></br>
                <p className="title">Actualiza la imagen del producto</p>
                <div className="edit-img-container">
                    <img className="edit-img" src={`http://localhost:5000/uploads/${idSpace}/${product.image}`}></img>
                    <div> 
                        <form onSubmit={editImage} encType="multipart/form-data" method="POST">
                            <input type="file" name='image' onChange={handleImage} required></input>
                            <button type="submit">Actualizar</button>
                        </form>
                    </div>
                </div>
                <div><button onClick={back}>Ver Todos los productos</button></div>
            </div>
            </div> 
            :
            <div>
            <h4>Tus productos</h4>
            {products ? 
                <div className="products-container">
                    <table className="products-table"> 
                        <thead>
                            <tr className="header">
                                <th>Producto</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th></th>
                                <></>
                            </tr>
                        </thead>
                        <tbody>  
                            {products.map((product, i) => {
                                return (
                                    <tr key={`tr-${i}`}>
                                        <td key={`product-name-${i}`}>{product.product_name}</td>
                                        <td key={`description-${i}`}>{product.description}</td>
                                        <td key={`price-${i}`}>{product.price}</td>
                                        <td key={`action-${i}`}> <a className="action" key={`edit-${i}`} onClick= {()=>{selectedToEdit(product)}}>Editar</a> | <a className="action" key={`delete-${i}`} onClick= {()=>{deleteProduct(product.id,product.product_name)}}>Borrar</a></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            : <p>Todavía no has subido ningún producto. Pinché en el menú en Añadir Product</p>}
            </div>
            }
        </div>
    )
}

export default ManageProducts;