import React, { useEffect, useState }  from "react";
import { postFetch } from '../../helpers/fetchs';
import '../../style/body.css';
import '../../style/my-account.css';

function SpaceData(props) { 
    const space = props.space;
    const [msn,setMsn] =  useState("");

    const editData = async e => {
        e.preventDefault();
        document.getElementById("sucess-message").style.display="none";
        var selectedOption = "Borrador";
        var state = selectedOption == "Borrador" ? "draft" : "public";
        var data = {id:space.id,name_space:e.target.name_space.value,description:e.target.description.value,state};
        await postFetch("/edit-space", data)
        .then((res) => res.json(res))
        .then(res=>{
            setMsn("Datos guardados correctamente");
            document.getElementById("sucess-message").style.display="block";
        })
    }
    
    return(
        <div className="personal-data-form">
            {space ? 
            <div>
                <h4>Edita tu espacio</h4>
                <p id="sucess-message" style={{display: "none"}}>{msn}</p>
                <form onSubmit={editData}>
                    <input type="text" name='name_space' placeholder='Nombre del espacio' defaultValue={space.name_space} required></input>
                    <textarea  name='description'  placeholder="Cuentanos algo sobre tu espacio..." defaultValue={space.description} required></textarea>
                    <select name='state'>
                        <option value="draft">Borrador</option>
                        <option value="publico">Publicado</option>
                    </select>
                    <button className="space-button" type="submit">Guardar</button>
                </form> 
            </div>
            :""} 
        </div>
    )
}

export default SpaceData;