import React, { useEffect, useState }  from "react";
import { useNavigate } from 'react-router-dom';
import { postFetch } from '../../helpers/fetchs';
import '../../style/body.css';

function ManageProducts(props) {
    var [products,setProducts] = useState();
    useEffect(()=>{
        fetch("/get-products-by-space/"+ props.idSpace)
        .then((res) => res.json(res))
        .then(res=>{
            setProducts(res);
            console.log(res);
        });
    },[]);

    const deleteProduct = (id) => {
        alert(id);
    }


    return(
        <div className="personal-data-form">
            <h4>Tus productos</h4>
            {products ? 
                <div className="products-container">
                    <table className="products-table"> 
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Acción</th>
                                <></>
                            </tr>
                        </thead>
                        <tbody>  
                            {products.map((product, i) => {
                                return (
                                    <tr>
                                        <td>{product.product_name}</td>
                                        <td>{product.description}</td>
                                        <td>{product.price}</td>
                                        <td> Editar | <a onClick= {()=>{deleteProduct(product.id)}}>Borrar</a></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            : <p>Todavía no ha subido ningún producto. Pinché en el menú en Añadir Product</p>}
        </div>
    )
}

export default ManageProducts;