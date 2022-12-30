import React, { useState }  from "react";
import { useNavigate } from 'react-router-dom';
import { postFetch } from '../helpers/fetchs';
import Cookies from 'universal-cookie';
import '../style/body.css';
import '../style/sigin-spacer.css';

function SiginSpacer() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const auth = localStorage.getItem("user");
    const [msn,setMsn] =  useState("");

    const siginSpacer = async e =>{
        e.preventDefault();
        document.getElementById("error-message").style.display="none";
        var data = {first_name:e.target.first_name.value,last_name:e.target.last_name.value,email:e.target.email.value,phone:e.target.phone.value, user_password:e.target.user_password.value};
        await postFetch("/register-spacer", data)
        .then((res) => res.json(res))
        .then(res=>{
            if(res.validation){
                cookies.set('session', res.jwt, { path: '/' });
                localStorage.setItem("user",JSON.stringify(res.user))
                navigate("/");
            }else{
                console.log(res.msn);
                setMsn(res.msn);
                document.getElementById("error-message").style.display="block";
            }
            
        })
    }

    return(
        <div className="page-content page-content-sigin-spacer">
            <div className="form-sigin-spacer">
                <h3> ¡Regístrate como Spacer!</h3> 
                <h4>Vende tus creaciones. Hazte Spacer.</h4>
                <form onSubmit={siginSpacer}>
                    <input type="text" name='first_name' placeholder='Nombre' required></input>
                    <input type="text" name='last_name' placeholder='Apellidos' required></input>
                    <input type="email" name='email' placeholder='Email' required></input>
                    <input type="tex" name='phone' placeholder='Teléfono' required></input>
                    <input type="password" name='user_password' placeholder='Contraseña' required></input>
                    {/* <input type="password" name='repeat_password' placeholder='Repetir Contraseña' required></input> */}
                    <p id="error-message" style={{display: "none"}}>{msn}</p>
                    <button type="submit">Regístrate</button>
                </form>   
            </div>
        </div>
    )
}

export default SiginSpacer;