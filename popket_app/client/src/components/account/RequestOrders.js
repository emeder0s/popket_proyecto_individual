import React, { useEffect, useState }  from "react";
import { postFetch } from '../../helpers/fetchs';
import '../../style/body.css';
import '../../style/my-account.css';

function RequestOrders(props) { 
    const [requests,setRequests] = useState();
    props.setNumRequests("");

    const getOrdersRequest = async () => {
        var id_user_spacer = JSON.parse(localStorage.getItem("user")).id;
        await fetch(`/get-orders-request-and-products/${id_user_spacer}`)
        .then((res) => res.json(res))
        .then(res=>{
            console.log(res);
            setRequests(res) ;
        })
    }

    useEffect(()=>{getOrdersRequest()},[]);

    const formatDate = (date) => {
        var time = date.split("T")[1];
        time = time.split(".")[0];
        date = date.split("T")[0];
        
        return date +' '+ time;
    }

    const acceptButton = async (id, state) => {
        var data = {id, state};
         await postFetch("/edit-request-state", data)
         .then((res) => res.json(res))
         .then(res=>{
            getOrdersRequest();
         })
    }

    return(
        <div className="orders-container">
             <h3>Solicitudes de pedidos</h3>
            <p id="no-order-message" style={{display: "none"}}>Aún no hay solicitudes</p>
            
            {requests ? 
               requests.map((request, i) => {
                return(
                    
                    <div className="box-order-request" key={`box-order-${i}`}>
                        <div className="general-state" key={`general-state-${i}`}>
                            <div key={`div1-${i}`}>
                                <div className="order-num" key={`order-num-${i}`}>Núm. Pedido: {request.order.num_order}</div>
                                <div className="order-date" key={`order-date-${i}`}>Realizado el {formatDate(request.order.order_date)}</div>
                                <div className="order-address" key={`order-address-${i}`}>Dirección de envío: {request.order.address}</div>
                            </div>
                            <div key={`div2-${i}`}>
                                <div className="order-state" key={`order-state-${i}`}>
                                    {request.state == "pending" ? <div><buttom className="accept-button" key={`accept-button-${i}`} onClick={()=>{acceptButton(request.id,"accept")}}>Aceptar Pedido</buttom></div> : <div><buttom className="send-button" key={`send-button-${i}`} onClick={()=>{acceptButton(request.id,"send")}}>Marcar como enviado</buttom></div> }
                                </div>
                            </div>
                        </div>
                        {request.products ? 
                            request.products.map((element, j) => {
                             return(
                                <div className="product" key={`product-${i}-${j}`}>
                                    <div className="product-img-account" key={`product-img-${i}-${j}`}><img className="product-image-account" key={`product-image-account-${i}-${j}`} src={`http://localhost:5000/uploads/${element.product.fk_id_space}/${element.product.image}`}></img></div><div className="product-name-account" key={`product-name-${i}-${j}`}>{element.quantity} x {element.product.product_name}</div><div className="product-price-account" key={`product-price-${i}-${j}`}>{element.product.price}€</div>
                                </div>
                            )})
                        :""}
                        <div className="separator" key={`separator-${i}`}></div>
                    </div>
                )})    
            : ""} 
        </div>
    )
}

export default RequestOrders;