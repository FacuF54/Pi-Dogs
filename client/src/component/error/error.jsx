import React from "react";
import { Link } from "react-router-dom";
import "./error.css"

const Error = () =>{
 return(
    <div className="errorPadre">
        <h1 className="errorName">OPS! Ruta equivocada ☺ </h1>
        
        <img  src="https://media4.giphy.com/media/l41JNsXAvFvoHvWJW/200w.webp?cid=ecf05e47n81p9uq0zjs5ir3istshpawu8hx6qpwp4glibls5&rid=200w.webp&ct=g" alt="error" className="imgError"/>
        
        <Link className="toHome" to="/home">
            <button className="btnError">ir al home</button>
        </Link>

    </div>
 )
}

export default Error