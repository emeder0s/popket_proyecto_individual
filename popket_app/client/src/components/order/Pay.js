import React, { useEffect, useState }  from "react";

import { postFetch } from '../../helpers/fetchs';
import {viaTypes} from '../../helpers/viaTypes'
import '../../style/body.css';
import '../../style/my-account.css';

function Pay(props) { 
    return(
        <div>
            <h3>Método de pago</h3>
            <div className="pay-row">
                <input type="text" id="cardholder" placeholder="Nombre del titular" required></input>
            </div>
            <div className="pay-row">
                <input type="text" id="cardnumber" placeholder="Número de tarjeta" required></input>
            </div>
            <div className="pay-row">
                <input type="text" placeholder="Fecha de expedición: MM/YY" id="date" required></input>
            </div>
            <div className="pay-row">
                <input type="text" id="cvv" placeholder="CVV / CVC *" required></input>
                <span className="small">* CVV o CVC es el código numérico de tres dígitos situado en la parte trasera de su tarjeta de crédito.</span>
            </div>
        </div>
    )
}

export default Pay;