import {React, useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import AddressForm from '../components/account/AddressForm';


function Order() {
    const cart = localStorage.getItem("cart");
    const [products, setProducts] = useState();
    const [viewIsSpacer, setViewIsSpacer] = useState( JSON.parse(localStorage.getItem("user")).isSpacer);

    useEffect(()=>{
      if (cart == null || cart.length < 0)
      {
      }else{
        setProducts(JSON.parse(cart));
      }
    },[])

    const getPrice = (price, quantity) => {
        return parseFloat(price) * parseInt(quantity)
      }
  
      const deleteFromCart = (pos) => {
        var removed = products.splice(pos, 1);
        localStorage.setItem("cart",JSON.stringify(products));
        setProducts(products);
      }
    
  return (
    <div className="page-content">
        <h3>Resumen</h3>
        <div>
                  {products ? 
                    products.map((product, i) => {
                      return (
                        <div className="cart-row" key={`cart-row-${i}`} name={`cart-row-${i}`}>
                           <div key={`img-div-${i}`}><img className="cart-product-img" src={`http://localhost:5000/uploads/${product.product.fk_id_space}/${product.product.image}`}></img></div>
                           <div className="details-div" key={`details-div-${i}`}>{product.quantity} x {product.product.product_name} - {getPrice(product.product.price,product.quantity)}€</div>
                           <div className="delete-div" key={`delete-div-${i}`}><Link onClick={() => {deleteFromCart(i)}} className="nav-link" key={`nav-link-${i}`}>Eliminar</Link></div>
                         </div>
                      )
                 })
                  :""}
        </div>
        <AddressForm isSpacer={viewIsSpacer}></AddressForm>
        
    </div>
  );
}

export default Order;