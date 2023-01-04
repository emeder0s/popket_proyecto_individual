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
        });
    },[]);

    const deleteProduct = (id,name) => {
        if (window.confirm(`¿Seguro que quieres borrar el producto ${name}?`)){
            fetch("/delete-product/"+ id, { method: 'DELETE' })
                .then((res) => res.json(res))
                .then(res=>{
                    console.log(res);
            });
        }
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
                                    <tr key={`tr-${i}`}>
                                        <td key={`product-name-${i}`}>{product.product_name}</td>
                                        <td key={`description-${i}`}>{product.description}</td>
                                        <td key={`price-${i}`}>{product.price}</td>
                                        <td key={`action-${i}`}> <a className="action" key={`edit-${i}`} onClick= {()=>{deleteProduct(product.id)}}>Editar</a> | <a className="action" key={`delete-${i}`} onClick= {()=>{deleteProduct(product.id,product.product_name)}}>Borrar</a></td>
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