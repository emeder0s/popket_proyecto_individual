import React, { useEffect, useState }  from "react";
import { Link } from 'react-router-dom';
import { postFetch } from '../../helpers/fetchs';
import {viaTypes} from '../../helpers/viaTypes'
import '../../style/body.css';
import '../../style/my-account.css';

function Address(props) { 
    const [address, setAddress] = useState();
    const [msn,setMsn] =  useState("");
    
    const getAddress = async () =>{
        var user_id = JSON.parse(localStorage.getItem("user")).id;
        var endpoint ="";
        if (props.isSpacer){
            endpoint = "/get-address-by-spacer/"+ user_id;
        }else{
            endpoint = "/get-address-by-user/"+ user_id;
        }
        await fetch(endpoint)
        .then((res) => res.json(res))
        .then(res=>{
            setAddress(res);
            console.log(res);
        }) 
    }
    useEffect(()=>{getAddress()},[]);

    const editData = async e => {
        e.preventDefault();
        document.getElementById("sucess-message").style.display="none";
        var data = {id:address.id,via_type:e.target.via_type.value,via_name:e.target.via_name.value,via_number:e.target.via_number.value,additional_address:e.target.additional_address.value,postal_code:e.target.postal_code.value,locality:e.target.locality.value,province:e.target.province.value,country:e.target.country.value};
        await postFetch("/edit-address", data)
        .then((res) => res.json(res))
        .then(res=>{
            setMsn("Dirección guardada correctamente");
            document.getElementById("sucess-message").style.display="block";
            setAddress(res);
        })
    }

    const newData = async e => {
        e.preventDefault();
        document.getElementById("sucess-message").style.display="none";
        var data = {via_type:e.target.via_type.value,via_name:e.target.via_name.value,via_number:e.target.via_number.value,additional_address:e.target.additional_address.value,postal_code:e.target.postal_code.value,locality:e.target.locality.value,province:e.target.province.value,country:e.target.country.value};
        if (props.isSpacer){
            var endpoint = "/new-address-for-spacer";
         }else{
            var endpoint = "/new-address-for-user";
        }
        await postFetch(endpoint, data)
        .then((res) => res.json(res))
        .then(res=>{
            setMsn("Dirección guardada correctamente");
            document.getElementById("sucess-message").style.display="block";
            setAddress(res);
        })
    }
    
    return(
        <div className="personal-data-form">
            {address ? 
            <div>
                <h3>Dirección</h3>
                <h4>Edita tu dirección</h4>
                <p id="sucess-message" style={{display: "none"}}>{msn}</p>
                <form onSubmit={editData}>
                    <select name='via_type'>
                    {viaTypes.map((viaType, i) => {
                        return(<option  key={i} value={viaType}>{viaType}</option>)
                    })}
                    </select>
                    <input type="text" name='via_name' placeholder='Nombre de la via' required defaultValue={address.via_name}></input>
                    <input type="text" name='via_number' placeholder='Número' required defaultValue={address.via_number}></input>
                    <input type="text" name='additional_address' placeholder='Información adicional' defaultValue={address.additional_address}></input>
                    <input type="text" name='postal_code' placeholder='Código Postal' required defaultValue={address.postal_code}></input>
                    <input type="text" name='locality' placeholder='Localidad'  defaultValue={address.locality}></input>
                    <input type="text" name='province' placeholder='Provincia'  defaultValue={address.province}></input>
                    <input type="text" name='country' placeholder='País'  defaultValue={address.country}></input>
                    <button type="submit">Guardar</button>
                </form> 
            </div>
            :
            <div>
                <h3>Dirección</h3>
                <h4>Añade tu dirección</h4>
                <p id="sucess-message" style={{display: "none"}}>{msn}</p>
                <form onSubmit={newData}>
                    <select name='via_type'>
                    {viaTypes.map((viaType, i) => {
                        return(<option  key={i} value={viaType}>{viaType}</option>)
                    })}
                    </select>
                    <input type="text" name='via_name' placeholder='Nombre de la via' required></input>
                    <input type="text" name='via_number' placeholder='Número' required></input>
                    <input type="text" name='additional_address' placeholder='Información adicional'></input>
                    <input type="text" name='postal_code' placeholder='Código Postal' required></input>
                    <input type="text" name='locality' placeholder='Localidad' ></input>
                    <input type="text" name='province' placeholder='Provincia' ></input>
                    <input type="text" name='country' placeholder='País'></input>
                    <button type="submit">Guardar</button>
                </form> 
            </div>
            }
        </div>
    )
}

export default Address;