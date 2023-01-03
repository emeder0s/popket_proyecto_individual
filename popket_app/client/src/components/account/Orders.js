import React, { useEffect, useState }  from "react";
import { postFetch } from '../../helpers/fetchs';
import '../../style/body.css';
import '../../style/my-account.css';

function Orders(props) { 
    const [msn,setMsn] =  useState("");
    const [errorMsn,setErrorMsn] =  useState("");
    const getOrders = async () => {
        var id_user_spacer = JSON.parse(localStorage.getItem("user")).id;
        var name_table="";
        props.isSpacer ? name_table = "spacer" : name_table = "user";
        await fetch(`/orders/${name_table}/${id_user_spacer}`)
        .then((res) => res.json(res))
        .then(res=>{
            console.log(res);
            // if (res.validation){
            //     setMsn(res.msn);
            //     document.getElementById("sucess-message").style.display="block";
            // }else{
            //     setErrorMsn(res.msn);
            //     document.getElementById("error-message").style.display="block";
            // }
        })
    }

    useEffect(()=>{getOrders()},[]);
    return(
        <div className="orders-container">
            <h3>Pedidos</h3>
            <div className="box-order">
                <div className="general-state">
                    <div>
                        <div className="order-num">Núm. Pedido: 2345678</div>
                        <div className="order-date">Realizado el 23/12/2022</div>
                    </div>
                    <div>
                        <div className="order-state">Estado del pedido: Enviado</div>
                    </div>
                </div>
                <div className="product">
                    <div className="product-img"></div><div className="product-name">1x Product Name</div><div className="product-price"> 16.50€</div>
                </div>
                <div className="product">
                    <div className="product-img"></div><div className="product-name">1x Product Name</div><div className="product-price"> 16.50€</div>
                </div>
                <div className="total-price">TOTAL: 33€</div>
                <div className="separator"></div>
            </div>

            <div className="box-order">
                <div className="general-state">
                    <div>
                        <div className="order-num">Núm. Pedido: 2345678</div>
                        <div className="order-date">Realizado el 23/12/2022</div>
                    </div>
                    <div>
                        <div className="order-state">Estado del pedido: Enviado</div>
                    </div>
                </div>
                <div className="product">
                    <div className="product-img"></div><div className="product-name">1x Product Name</div><div className="product-price"> 16.50€</div>
                </div>
                <div className="product">
                    <div className="product-img"></div><div className="product-name">1x Product Name</div><div className="product-price"> 16.50€</div>
                </div>
                <div className="total-price">TOTAL: 33€</div>
                <div className="separator"></div>
            </div>
        </div>
    )
}

export default Orders;