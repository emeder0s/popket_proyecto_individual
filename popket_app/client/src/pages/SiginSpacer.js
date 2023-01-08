import React, { useEffect, useState }  from "react";
import { useNavigate } from 'react-router-dom';
import { postFetch } from '../helpers/fetchs';
import { checkAuth } from '../helpers/checkAuth';
import { checkCart } from '../helpers/checkCart';
import Cookies from 'universal-cookie';
import '../style/body.css';
import '../style/sigin-spacer.css';

function SiginSpacer() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [auth, setAuth] = useState(checkAuth());
    const [space, setSpace] = useState();
    const [addProduct, setAddProduct] = useState();
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
                checkCart();
                setAuth(localStorage.getItem("user"));
            }else{
                setMsn(res.msn);
                document.getElementById("error-message").style.display="block";
            } 
        })
    }

    const createSpace = async e =>{
        e.preventDefault();
        var data = {name_space:e.target.name_space.value,state:e.target.state.value,description:e.target.description.value};
        await postFetch("/add-space", data)
        .then((res) => res.json(res))
        .then(res=>{
            if(res){
                setSpace(res);
                navigate("/editar-space");
            }
        })
    }

    const getSpaceByUser = () =>{
        fetch("/get-space-by-user")
            .then((res) => res.json(res))
            .then(res=>{
                setSpace(res.space_id);
                if (res.validation){
                    setAddProduct(true);
                }
        });
    }

    useEffect(()=>{
        if (auth) {
            getSpaceByUser();  
        }
    },[auth]);

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
                            <option value="public">Publicado</option>
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
            {/* {addProduct ? 
                <div className="form-sigin-spacer">
                    <h3> PASO 3 - ¡Añade un producto!</h3> 
                    <h4>Añade una imagen y las características de tu producto</h4>
                    <AddProduct space={space}></AddProduct>
                </div>
            :""} */}
        </div>
    )
}

export default SiginSpacer;