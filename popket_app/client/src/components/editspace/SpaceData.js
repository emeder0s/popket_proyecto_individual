import React, { useEffect, useState }  from "react";
import { postFetch } from '../../helpers/fetchs';
import '../../style/body.css';
import '../../style/my-account.css';

function SpaceData() { 
    const [space, setSpace] = useState();
    // const [viewIsSpacer, setViewIsSpacer] = useState(props.isSpacer);
    const [msn,setMsn] =  useState("");
        
    const getSpace = async () =>{
        await fetch("/show-space-by-spacer")
        .then((res) => res.json(res))
        .then(res=>{
            console.log(res);
            setSpace(res);
        }) 
    }
    useEffect(()=>{getSpace()},[]);

    const editData = async e => {
        e.preventDefault();
    //     document.getElementById("sucess-message").style.display="none";
    //     var data = {first_name:e.target.first_name.value,last_name:e.target.last_name.value,email:e.target.email.value,phone:e.target.phone.value};
    //     if (props.isSpacer){
    //         var endpoint = "/edit-spacer/";
    //     }else{
    //         var endpoint = "/edit-user/";
    //     }
    //     await postFetch(endpoint, data)
    //     .then((res) => res.json(res))
    //     .then(res=>{
    //         setMsn("Datos guardados correctamente");
    //         document.getElementById("sucess-message").style.display="block";
    //     })
    }
    
    return(
        <div className="personal-data-form">
            {space ? 
            <div>
                <h4>Edita tu espacio</h4>
                <p id="sucess-message" style={{display: "none"}}>{msn}</p>
                <form onSubmit={editData}>
                    <input type="text" name='name_space' placeholder='Nombre del espacio' required></input>
                    <textarea  name='description'  placeholder="Cuentanos algo sobre tu espacio..." required></textarea>
                    <select name='state'>
                        <option value="draft">Borrador</option>
                        <option value="publico">Publicado</option>
                    </select>
                    <button type="submit">Guardar</button>
                </form> 
            </div>
            :""} 
              
        </div>
    )
}

export default SpaceData;