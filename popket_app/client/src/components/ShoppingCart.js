import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ShoppingCart() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);

  return (
    <div className="shopping-cart">
        <div>
            <aside>
               <h3>Carrito</h3>
               <></> 
            </aside>
        </div>
    </div>
  );
}

export default ShoppingCart;