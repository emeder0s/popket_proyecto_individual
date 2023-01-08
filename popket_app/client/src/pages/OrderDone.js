import React, { useState, useEffect } from "react";

import '../style/body.css';
import '../style/order.css';

function OrderDone(){
    const order = JSON.parse(localStorage.getItem("order"));
    console.log(order);

    const getPrice = (price, quantity) => {
        return parseFloat(price) * parseInt(quantity)
    }

  return (
    <div className="page-content page-content-order">
        {order ?
        <div>
            <div className="order-details-container">
                <h3>Pedido {order.num_order} realizado correctamente</h3>
                <p>Unos vez el pedido esté aceptado se enviará un correo de confirmación</p>
                <div className="border-div">
                    <h4>Resumen</h4>
                    {order.products ? 
                        order.products.map((product, i) => {
                        return (
                            <div className="cart-row" key={`cart-row-${i}`}>
                            <div key={`img-div-${i}`}><img className="cart-product-img" src={`http://localhost:5000/uploads/${product.fk_id_space}/${product.image}`}></img></div>
                            <div className="details-div" key={`details-div-${i}`}>{order.quantity[i]} x {product.product_name} - {getPrice(product.price, order.quantity[i])}€</div>
                            </div>
                        )
                    })
                    :""}
                <div className="total-div">TOTAL: {order.total_account}€</div>
                </div>
                
                <div className="border-div">
                <h4>Dirección del pedido</h4>
                    <p>{order.address}</p>
                </div>
            </div>
        </div>
         :""}

    </div>   
  );
}

export default OrderDone;