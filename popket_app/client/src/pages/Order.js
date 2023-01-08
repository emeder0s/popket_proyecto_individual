import {React, useEffect, useState} from "react";
import { Link,useNavigate } from 'react-router-dom';
import OrderAddress from '../components/order/OrderAddress';
import Pay from '../components/order/Pay';
import { checkAuth } from '../helpers/checkAuth';
import '../style/order.css'


function Order() {
    const cart = localStorage.getItem("cart");
    const navigate = useNavigate();
    var auth = checkAuth();
    const [products, setProducts] = useState(false);
    const [viewIsSpacer, setViewIsSpacer] = useState( JSON.parse(localStorage.getItem("user")).isSpacer);
    const [total, setTotal] = useState();

    useEffect(()=>{
      var c = JSON.parse(cart);
      if (c.length > 0) {
        setProducts(JSON.parse(cart));
        var totalprice = 0;
        JSON.parse(cart).map(elem => {
          totalprice += getPrice(elem.product.price,elem.quantity)
        })
        setTotal(totalprice);
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

    const addressToString = () => {
      var via_type = document.getElementById("via_type").value;
      var via_name = document.getElementById("via_name").value;
      var via_number = document.getElementById("via_number").value;
      var additional_address = document.getElementById("additional_address").value;
      var postal_code = document.getElementById("postal_code").value;
      var locality = document.getElementById("locality").value;
      var province = document.getElementById("province").value;
      var country = document.getElementById("country").value;

      return `${via_type} ${via_name} ${via_number} ${additional_address}, ${postal_code}, ${locality} ${province} ${country}`
    }

    const saveOrder = () => {
      var order = {address:addressToString(),total_account:total,products}
      localStorage.setItem("order",JSON.stringify(order));
    }
    
  return (
    <div className="page-content page-content-order">
      {auth ?
      <div>
          <div className="border-div">
          <h3>Resumen</h3>
          <div >
              {products ? 
                products.map((product, i) => {
                  return (
                    <div className="cart-row" key={`cart-row-${i}`} name={`cart-row-${i}`}>
                        <div key={`img-div-${i}`}><img className="cart-product-img" src={`http://localhost:5000/uploads/${product.product.fk_id_space}/${product.product.image}`}></img></div>
                        <div className="details-div" key={`details-div-${i}`}>{product.quantity} x {product.product.product_name} - {getPrice(product.product.price,product.quantity)}€</div>
                        {/* <div className="delete-div" key={`delete-div-${i}`}><Link onClick={() => {deleteFromCart(i)}} className="nav-link" key={`nav-link-${i}`}>Eliminar</Link></div> */}
                      </div>
                  )
              })
              :""}
              {products ? 
              <div className="total-div">TOTAL: {total}€</div> 
              :<p>No hay productos en el carrito. ¿A qué esperas?</p>}   
          </div>
        </div>
        <div className="border-div">
          <OrderAddress isSpacer={viewIsSpacer}></OrderAddress >
        </div>
        <div className="border-div"> 
              <Pay></Pay>
        </div>
        <button onClick={saveOrder}>Realizar Pedido</button>
      </div>
      :
       <div>Tienes que estar logueado</div>
      }
        
    </div>
  );
}

export default Order;