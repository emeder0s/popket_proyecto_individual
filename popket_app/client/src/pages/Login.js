import React, { useState }  from "react";
import { useNavigate } from 'react-router-dom';
import { postFetch } from '../helpers/fetchs';
import { checkAuth } from '../helpers/checkAuth';
import { useContext } from 'react';
import UserContext from "../components/context/UserContext";
import Cookies from 'universal-cookie';
import '../style/body.css';
import '../style/login.css';


function Login() {
    const cookies = new Cookies();
    var auth = checkAuth();
    const {user, setUser} = useContext(UserContext);
    const [msn,setMsn] =  useState("");

    const login = async e =>{
        e.preventDefault();
        document.getElementById("error-message").style.display="none";
        var data = {email:e.target.email.value, password:e.target.password.value};
        await postFetch("/login", data)
        .then((res) => res.json(res))
        .then(res=>{
            if(res.validation){
                cookies.set('session', res.jwt, { path: '/' });
                localStorage.setItem("user",JSON.stringify(res.user))
                localStorage.setItem("cart",JSON.stringify([]));
                setUser(res.user);
            }else{
                setMsn(res.msn);
                document.getElementById("error-message").style.display="block";
            }
            
        })
    }

    return(
        <div className="page-content page-content-login">
            {auth ?
            <div className="form-login">
                <h2>¡Bienvenidx a POPKET!</h2> 
            </div>
            :
            <div className="form-login">
                <h4>Inicia Sesión, ¡a qué esperas!</h4> 
                <form onSubmit={login}>
                    <input type="email" name='email' placeholder='Email' required></input>
                    <input type="password" name='password' placeholder='Contraseña' required></input>
                    <p id="error-message" style={{display: "none"}}>{msn}</p>
                    <button type="submit">Log in</button>
                </form>   
            </div>}
        </div>
    )
}

export default Login;