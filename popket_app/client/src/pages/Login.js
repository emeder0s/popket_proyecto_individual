import React from "react";
import { useNavigate } from 'react-router-dom';
import { postFetch } from '../helpers/fetchs';
import { useContext } from 'react';
import UserContext from "../components/context/UserContext";
import Cookies from 'universal-cookie';


function Login() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const auth = localStorage.getItem("user");
    const {user, setUser} = useContext(UserContext);

    const login = async e =>{
        e.preventDefault();
        var data = {email:e.target.email.value, password:e.target.password.value};
        await postFetch("/login", data)
        .then((res) => res.json(res))
        .then(res=>{
            if(res.validation){
                cookies.set('session', res.jwt, { path: '/' });
                localStorage.setItem("user",JSON.stringify(res.user))
                setUser(res.user);
            }else{
                console.log("no existe");
            }
            
        })
    }

    return(
        <div className="page-content">
            {auth ?
            <div className="form-login">
                <h4>¡Ya estás logueada!</h4> 
            </div>
            :
            <div className="form-login">
                <h4>Inicia Sesión, ¡a qué esperas!</h4> 
                <form onSubmit={login}>
                    <input type="email" name='email' placeholder='Email' required></input>
                    <br />
                    <input type="password" name='password' placeholder='Contraseña' required></input>
                    <br />
                    <button type="submit">Log in</button>
                </form>   
            </div>}
        </div>
    )
}

export default Login;