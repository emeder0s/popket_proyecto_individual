import React, { useState }  from "react";
import { Link } from 'react-router-dom';
import '../../style/body.css';
import '../../style/my-account.css';

function PersonalDataForm(props) {
    const [user,setUser]= useState();
    // console.log(props.isSpacer)
    // fetch("/show-user")
    // .then((res) => res.json(res))
    // .then(res=>{
    //     setSpace(res);
    // })    


    const editData = async e => {
        alert("hola")
    }
    
    return(
     
        <div className="personal-data-form">
            <h3>Datos Personales</h3>
            <h4>Edita tus datos</h4>
            <form onSubmit={editData}>
                <input type="text" name='first_name' placeholder='Nombre' required></input>
                <input type="text" name='last_name' placeholder='Apellidos' required></input>
                <input type="email" name='email' placeholder='Email' required></input>
                <input type="tex" name='phone' placeholder='Teléfono' required></input>
                {/* <p id="error-message" style={{display: "none"}}>{msn}</p> */}
                <button type="submit">Guardar</button>
            </form>   
        </div>
    )
}

export default PersonalDataForm;