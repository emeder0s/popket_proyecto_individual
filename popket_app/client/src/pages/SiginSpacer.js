import React, { useState }  from "react";
import { useNavigate } from 'react-router-dom';
import { postFetch } from '../helpers/fetchs';
import { checkAuth } from '../helpers/checkAuth';
import Cookies from 'universal-cookie';
import '../style/body.css';
import '../style/sigin-spacer.css';

function SiginSpacer() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [auth, setAuth] = useState(checkAuth());
    const [space, setSpace] = useState();
    const [msn,setMsn] =  useState("");

    const siginSpacer = async e => {
        e.preventDefault();
        document.getElementById("error-message").style.display="none";
        var data = {first_name:e.target.first_name.value,last_name:e.target.last_name.value,email:e.target.email.value,phone:e.target.phone.value, spacer_password:e.target.spacer_password.value};
        await postFetch("/register-spacer", data)
        .then((res) => res.json(res))
        .then(res=>{
            if(res.validation){
                cookies.set('session', res.jwt, { path: '/' });
                localStorage.setItem("user",JSON.stringify(res.user))
                setAuth(localStorage.getItem("user"));
            }else{
                setMsn(res.msn);
                document.getElementById("error-message").style.display="block";
            }
            
        })
    }

    const createSpace = async e =>{
        e.preventDefault();
        // document.getElementById("error-message").style.display="none";
        var data = {name_space:e.target.name_space.value,state:e.target.state.value,description:e.target.description.value};
        await postFetch("/add-space", data)
        .then((res) => res.json(res))
        .then(res=>{
            if(res){
                setSpace(res);
                navigate("/");
            }
        })
    }

    fetch("/get-space-by-user")
    .then((res) => res.json(res))
    .then(res=>{
        setSpace(res);
    })

    return(
        <div className="page-content page-content-sigin-spacer">
            {
                auth ? 
                <div className="form-container">
                {space ? 
                    <div></div>
                    :
                    <div className="form-sigin-spacer">
                    <h3> PASO 2 - ¡Crea tu espacio!</h3> 
                    <h4>Ponle un nombre bonito y sube tus productos.</h4>
                    <form onSubmit={createSpace}>
                        <input type="text" name='name_space' placeholder='Nombre del espacio' required></input>
                        <textarea  name='description'  placeholder="Cuentanos algo sobre tu espacio..." required></textarea>
                        <select name='state'>
                            <option value="draft">Borrador</option>
                            <option value="publico">Publicado</option>
                        </select>
                        <button className="button-space" type="submit">Crear Espacio</button>
                    </form>   
                </div>
                }
                 </div>
            :
            <div className="form-sigin-spacer">
                <h3> PASO 1 - ¡Regístrate como Spacer!</h3> 
                <h4>Vende tus creaciones. Hazte Spacer.</h4>
                <form onSubmit={siginSpacer}>
                    <input type="text" name='first_name' placeholder='Nombre' required></input>
                    <input type="text" name='last_name' placeholder='Apellidos' required></input>
                    <input type="email" name='email' placeholder='Email' required></input>
                    <input type="tex" name='phone' placeholder='Teléfono' required></input>
                    <input type="password" name='spacer_password' placeholder='Contraseña' required></input>
                    <p id="error-message" style={{display: "none"}}>{msn}</p>
                    <button type="submit" className="button-space">Regístrate</button>
                </form>   
            </div>
            }
        </div>
    )
}

export default SiginSpacer;