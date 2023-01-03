import React, { useEffect, useState }  from "react";
import { Link } from 'react-router-dom';
import { postFetch } from '../../helpers/fetchs';
import '../../style/body.css';
import '../../style/my-account.css';

function PersonalDataForm(props) { 
    const [user, setUser] = useState();
    const [msn,setMsn] =  useState("");
    
    const getUser = async () =>{
        var user_id = JSON.parse(localStorage.getItem("user")).id;
        var endpoint = "";
        // console.log(props.isSpacer);
        if (props.isSpacer){
            endpoint = "/spacer/"+ user_id;
        }else{
            endpoint = "/user/"+ user_id;
        }
        await fetch(endpoint)
        .then((res) => res.json(res))
        .then(res=>{
            setUser(res);
        }) 
    }
    useEffect(()=>{getUser()},[]);


    const editData = async e => {
        e.preventDefault();
        document.getElementById("sucess-message").style.display="none";
        var data = {first_name:e.target.first_name.value,last_name:e.target.last_name.value,email:e.target.email.value,phone:e.target.phone.value};
        if (props.isSpacer){
            var endpoint = "/edit-spacer/";
        }else{
            var endpoint = "/edit-user/";
        }
        await postFetch(endpoint, data)
        .then((res) => res.json(res))
        .then(res=>{
            setMsn("Datos guardados correctamente");
            document.getElementById("sucess-message").style.display="block";
        })
    }
    
    return(
        <div className="personal-data-form">
            {user ? 
            <div>
                <h3>Datos Personales</h3>
                <h4>Edita tus datos</h4>
                <p id="sucess-message" style={{display: "none"}}>{msn}</p>
                <form onSubmit={editData}>
                    <input type="text" name='first_name' placeholder='Nombre' required defaultValue={user.first_name}></input>
                    <input type="text" name='last_name' placeholder='Apellidos' required defaultValue={user.last_name}></input>
                    <input type="email" name='email' placeholder='Email' required defaultValue={user.email}></input>
                    <input type="tex" name='phone' placeholder='Teléfono' required defaultValue={user.phone}></input>
                    <button type="submit">Guardar</button>
                </form> 
            </div>
            :""}
              
        </div>
    )
}

export default PersonalDataForm;