import React from "react";
import { postFetch } from '../helpers/defaultFetch';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

function Login() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const login = async e =>{
        e.preventDefault();
        var data = {email:e.target.email.value, password:e.target.password.value};
        await postFetch("localhost:5000/login","POST", data)
        .then(res=>{
            
        })
    }

    return(
        <div>
            hola
        </div>
    )
}

export default Login;