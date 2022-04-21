import React , {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";



function Code(){

    let history = useHistory();
    
    const [codigo,setCodigo] = useState('');

    useEffect(()=>{
        getCode();
    },[]);

    function getCode(descricao){

        catchRainbow()
        .catch(error => {
            console.log('error!');
            console.error(error);
        });
    }

    async function catchRainbow() {
        const response = await fetch('http://127.0.0.1:8080/api/cliente/get_qr_code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',     
            },
            body: JSON.stringify(),
            });

        const blob = await response.blob();
        setCodigo(URL.createObjectURL(blob));
    }

    function Back() {
        let path = '/ChooseCode';
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

export default Code;