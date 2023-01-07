import {React, useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ShoppingCart() {
    const cart = localStorage.getItem("cart");
    const [viewCart, setViewCart] = useState();
    const [products, setProducts] = useState();


    useEffect(()=>{
      if (cart == null)
      {
        setViewCart(false);
      }else{
        setProducts(JSON.parse(cart));
        setViewCart(true);
      }
    },[])

    const getPrice = (price, quantity) => {
      return 10
    }

  return (
    <div className="shopping-cart">
        <div>
            <aside>
               <h3>Carrito</h3>
               {viewCart ?
               <div>
                  {products ? 
                    products.map((product, i) => {
                      return (
                        <div>
                           <div><img></img></div>
                           <div>{product.quantity} x {product.product.product_name} - {getPrice(product.product.price,product.quantity)}€</div>
                         </div>
                      )
                 })
                  :""}
                  </div>
               :<p>No hay productos en el carrito.</p> }
            </aside>
        </div>
    </div>
  );
}

export default ShoppingCart;