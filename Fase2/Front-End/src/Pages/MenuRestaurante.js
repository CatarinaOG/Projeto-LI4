import React from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from "react-router-dom";
import {useEffect, useRef, useState} from 'react'




function MenuRestaurante() {

    const history = useHistory();
    const [pratos,setPratos] = useState([]);
    const data1 = {
        nothing: '',
    }
    
    const getPratos= async () => {
        const response = await fetch('http://127.0.0.1:8080/api/restaurante/menu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data1),
        });
        const pratos = await response.json();
        setPratos(pratos);
    }

    useEffect( () => {
        getPratos();
    },[]);

    function Back() {
        let path = '/Restaurante';
        history.push(path);
    }
    

    return(
        <div>
            <h1 style={{color:"white"}}>Menu do restaurante:</h1>
            <div className ="divGrey">
                {pratos.map(
                    (prato) => (
                    <div className = "divAvaliacao">
                        <h5>{prato.nome}</h5>  
                        <p>{prato.preco}€</p>
                    </div>
                    )
                )}
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <button onClick={Back}>Back</button>
            </div>
        </div>
    )
}

export default MenuRestaurante;