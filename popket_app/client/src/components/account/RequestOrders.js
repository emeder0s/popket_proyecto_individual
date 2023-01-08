import React, { useEffect, useState }  from "react";
import '../../style/body.css';
import '../../style/my-account.css';

function RequestOrders(props) { 
    const [msn,setMsn] =  useState("");
    const [errorMsn,setErrorMsn] =  useState("");
    const [noOrderMsn,setNoOrderMsn] =  useState("");
    const [orders,setOrders] = useState();

    // const getOrders = async () => {
    //     var id_user_spacer = JSON.parse(localStorage.getItem("user")).id;
    //     await fetch(`/get-orders-request/${id_user_spacer}`)
    //     .then((res) => res.json(res))
    //     .then(res=>{
    //         console.log(res);   
    //     })
    // }

    // useEffect(()=>{getOrders()},[]);

    const formatDate = (date) => {
        var time = date.split("T")[1];
        time = time.split(".")[0];
        date = date.split("T")[0];
        
        return date +' '+ time;
    }

    return(
        <div className="orders-container">
            {/* <h3>Pedidos</h3>
            <p id="no-order-message" style={{display: "none"}}>Aún no has realizado ningún pedido</p>
            {orders ? 
               orders.map((order, i) => {
                return(
                    <div className="box-order" key={`box-order-${i}`}>
                        <div className="general-state" key={`general-state-${i}`}>
                            <div key={`div1-${i}`}>
                                <div className="order-num" key={`order-num-${i}`}>Núm. Pedido: {order.num_order}</div>
                                <div className="order-date" key={`order-date-${i}`}>Realizado el {formatDate(order.order_date)}</div>
                                <div className="order-address" key={`order-address-${i}`}>Dirección de envío: {order.address}</div>
                            </div>
                            <div key={`div2-${i}`}>
                                <div className="order-state" key={`order-state-${i}`}>Estado: {order.state}</div>
                            </div>
                        </div>
                        {order.products ? 
                            order.products.map((element, j) => {
                             return(
                                <div className="product" key={`product-${i}-${j}`}>
                                    <div className="product-img-account" key={`product-img-${i}-${j}`}><img className="product-image-account" key={`product-image-account-${i}-${j}`} src={`http://localhost:5000/uploads/${element.product.fk_id_space}/${element.product.image}`}></img></div><div className="product-name-account" key={`product-name-${i}-${j}`}>{element.quantity} x {element.product.product_name}</div><div className="product-price-account" key={`product-price-${i}-${j}`}>{element.product.price}€</div>
                                </div>
                            )})
                        :""}
                        <div className="total-price" key={`total-price-${i}`}>TOTAL: {order.total_account}€</div>
                        <div className="separator" key={`separator-${i}`}></div>
                    </div>
                )})    
            : ""} */}
        </div>
    )
}

export default RequestOrders;