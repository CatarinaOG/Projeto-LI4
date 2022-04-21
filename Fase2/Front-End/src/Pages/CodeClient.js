import React , {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";



function CodeClient(){

    let history = useHistory();
    
    const [codigo,setCodigo] = useState('');

    useEffect(()=>{
        getCode();
    },[]);

    function getCode(){

        catchRainbow()
        .catch(error => {
            console.log('error!');
            console.error(error);
        });
    }

    async function catchRainbow() {
        fetch('http://127.0.0.1:8080/api/cliente/get_qr_code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',     
            },
            body: JSON.stringify(),
        })
        .then(response => response.blob())
        .then(data => setCodigo(URL.createObjectURL(data)))

    }

    function Back() {
        let path = '/ChooseCodeCliente';
        history.push(path);        
    }

    return (
        <div className="center">
            <h1 className="colorWhite">Código Selecionado</h1>
            <div className ="divGrey">
                <img src={codigo}></img><br/>
                <button onClick={Back}>Back</button>
            </div>
        </div>


    )

}

export default CodeClient;