import React, { useEffect, useState }  from "react";
import '../../style/body.css';
import '../../style/my-account.css';

function Orders(props) { 
    const [msn,setMsn] =  useState("");
    const [errorMsn,setErrorMsn] =  useState("");
    const [orders,setOrders] = useState();

    const getOrders = async () => {
        var id_user_spacer = JSON.parse(localStorage.getItem("user")).id;
        var name_table="";
        props.isSpacer ? name_table = "spacer" : name_table = "user";
        await fetch(`/orders/${name_table}/${id_user_spacer}`)
        .then((res) => res.json(res))
        .then(res=>{
            console.log(res);
            setOrders(res);
        })
    }

    useEffect(()=>{getOrders()},[]);

    return(
        <div className="orders-container">
            <h3>Pedidos</h3>
            {orders ? 
               orders.map((order, i) => {
                return(
                    <div className="box-order" key={`box-order-${i}`}>
                        <div className="general-state" key={`general-state-${i}`}>
                            <div key={`div1-${i}`}>
                                <div className="order-num" key={`order-num-${i}`}>Núm. Pedido: {order.num_order}</div>
                                <div className="order-date" key={`order-date-${i}`}>Realizado el 23/12/2022</div>
                                <div className="order-address" key={`order-address-${i}`}>Dirección de envío: {order.address}</div>
                            </div>
                            <div key={`div2-${i}`}>
                                <div className="order-state" key={`order-state-${i}`}>Estado del pedido: Enviado</div>
                            </div>
                        </div>
                        <div className="product" key={`product-${i}`}>
                            <div className="product-img" key={`product-img-${i}`}></div><div className="product-name" key={`product-name-${i}`}>1x Product Name</div><div className="product-price" key={`product-price-${i}`}> 16.50€</div>
                        </div>
                        <div className="total-price" key={`total-price-${i}`}>TOTAL: {order.total_account}</div>
                        <div className="separator" key={`separator-${i}`}></div>
                    </div>
                )})
                
            :""}
        </div>
    )
}

export default Orders;