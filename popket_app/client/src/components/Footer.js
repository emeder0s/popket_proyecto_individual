import React, { useEffect, useState } from "react";
import { AiOutlineInstagram, AiOutlineFacebook, AiOutlineLinkedin } from "react-icons/ai";
import '../style/navigation.css';

export const Footer = (props) => {
  

  return(
    <footer>
      <div><h3>Get in touch!</h3></div>
      <div className="row">
        <div>
        <h5>Contacto</h5> 
        <p>info@popket.com</p> 
        </div>
        <div>
        <h5>Social</h5> 
        <p><AiOutlineInstagram/> <AiOutlineFacebook/> <AiOutlineLinkedin/> </p> 
        </div>
      </div>
    </footer>
  )

}

