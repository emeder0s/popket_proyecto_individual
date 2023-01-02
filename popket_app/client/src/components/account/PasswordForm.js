import React, { useEffect, useState }  from "react";
import { postFetch } from '../../helpers/fetchs';
import '../../style/body.css';
import '../../style/my-account.css';

function PasswordForm(props) { 
    const [msn,setMsn] =  useState("");
    const [errorMsn,setErrorMsn] =  useState("");

    const editData = async e => {
        e.preventDefault();
        document.getElementById("sucess-message").style.display="none";
        document.getElementById("error-message").style.display="none";
        var data = {old_password:e.target.old_password.value,new_password:e.target.new_password.value,repeat_password:e.target.repeat_password.value};
        var endpoint = "";
        if (props.isSpacer){
            endpoint = "/edit-spacer-password";
        }else{
            endpoint = "/edit-user-password";
        } 
        await postFetch(endpoint, data)
        .then((res) => res.json(res))
        .then(res=>{
            if (res.validation){
                setMsn(res.msn);
                document.getElementById("sucess-message").style.display="block";
            }else{
                setErrorMsn(res.msn);
                document.getElementById("error-message").style.display="block";
            }
        })
    }
    
    return(
        <div className="personal-data-form">
            <div>
                <h3>Contraseña</h3>
                <h4>Actualiza tu contraseña</h4>
                <p id="sucess-message" style={{display: "none"}}>{msn}</p>
                <p id="error-message" style={{display: "none"}}>{errorMsn}</p>
                <form onSubmit={editData}>
                    <input type="password" name='old_password' placeholder='Contraseña actual' required></input>
                    <input type="password" name='new_password' placeholder='Nueva contraseña' required></input>
                    <input type="password" name='repeat_password' placeholder='Repite la contraseña' required></input>
                    <button type="submit">Guardar</button>
                </form> 
            </div>
        </div>
    )
}

export default PasswordForm;