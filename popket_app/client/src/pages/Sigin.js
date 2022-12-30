import React from "react";
import { useNavigate } from 'react-router-dom';
import { postFetch } from '../helpers/fetchs';
import Cookies from 'universal-cookie';


function Sigin() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const auth = localStorage.getItem("user");

    const sigin = async e =>{
        e.preventDefault();
        var data = {first_name:e.target.first_name.value,last_name:e.target.last_name.value,email:e.target.email.value,phone:e.target.phone.value, user_password:e.target.user_password.value};
        await postFetch("/register", data)
        .then((res) => res.json(res))
        .then(res=>{
            if(res.validation){
                cookies.set('session', res.jwt, { path: '/' });
                localStorage.setItem("user",JSON.stringify(res.user))
                navigate("/");
            }else{
                console.log("no existe");
            }
            
        })
    }

    return(
        <div className="page-content">
            <div className="form-sigin">
                <h4>¿No tienes cuenta?, ¡Regístrate!</h4> 
                <form onSubmit={sigin}>
                    <input type="text" name='first_name' placeholder='Nombre' required></input>
                    <input type="text" name='last_name' placeholder='Apellidos' required></input>
                    <input type="email" name='email' placeholder='Email' required></input>
                    <input type="tex" name='phone' placeholder='Teléfono' required></input>
                    <input type="password" name='user_password' placeholder='Contraseña' required></input>
                    {/* <input type="password" name='repeat_password' placeholder='Repetir Contraseña' required></input> */}
                    <button type="submit">Regístrate</button>
                </form>   
            </div>
        </div>
    )
}

export default Sigin;