import {React, useEffect, useState} from "react";
import { Link,useNavigate } from 'react-router-dom';

function ShoppingCart() {
    const cart = localStorage.getItem("cart");
    const navigate = useNavigate();
    const [viewCart, setViewCart] = useState();
    const [products, setProducts] = useState();


    useEffect(()=>{
      console.log();
      if (cart == null || cart.length < 0)
      {
        setViewCart(false);
      }else{
        setProducts(JSON.parse(cart));
        setViewCart(true);
      }
    },[])

    const getPrice = (price, quantity) => {
      return parseFloat(price) * parseInt(quantity)
    }

    const deleteFromCart = (pos) => {
      var removed = products.splice(pos, 1);
      localStorage.setItem("cart",JSON.stringify(products));
      setProducts(products);
      if(!products.length > 0){
        setViewCart(false);
      }
    }

    const redirect = () => {
      document.getElementById("nav-link-cart").click();
      navigate("/tramitar-pedido");
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
                        <div className="cart-row" key={`cart-row-${i}`}>
                           <div key={`img-div-${i}`}><img className="cart-product-img" src={`http://localhost:5000/uploads/${product.product.fk_id_space}/${product.product.image}`}></img></div>
                           <div className="details-div" key={`details-div-${i}`}>{product.quantity} x {product.product.product_name} - {getPrice(product.product.price,product.quantity)}€</div>
                           <div className="delete-div" key={`delete-div-${i}`}><Link onClick={() => {deleteFromCart(i)}} className="nav-link" key={`nav-link-${i}`}>Eliminar</Link></div>
                         </div>
                      )
                 })
                  :""}
                  {viewCart ? <div><button onClick={redirect}>Tramitar pedido</button></div> : ""}
                  </div>
               : <p>No hay productos en el carrito.</p> }
            </aside>
        </div>
    </div>
  );
}

export default ShoppingCart;