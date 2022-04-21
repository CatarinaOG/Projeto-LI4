import React from "react";
import { useHistory } from "react-router-dom";



function ChooseMap(){

    const history = useHistory();

    function toMapDistancia() {

        fetch('http://127.0.0.1:8080/api/cliente/set_mapa_atual', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({mapa: "distancia"}),
        });

        let path = '/MapDistancia';
        history.push(path);  
    }

    
    function toMapClassificacao() {

        fetch('http://127.0.0.1:8080/api/cliente/set_mapa_atual', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({mapa: "classificacao"}),
        });


        let path = '/MapClassificacao';
        history.push(path);  
    }


    function toMapAmbos() {

        fetch('http://127.0.0.1:8080/api/cliente/set_mapa_atual', { 
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({mapa: "ambos"}),
        });


        let path = '/MapAmbos';
        history.push(path);
    }

    function Back(){
        let path = '/FrontPageUser';
        history.push(path);
    }


    return(
        <div className = "divGrey">
            <div className = "center">
                <h1>Escolha o filtro desejado:</h1>
                <button onClick={toMapDistancia}>Distância</button>
                <button onClick={toMapClassificacao}>Classificação</    button>
                <button onClick={toMapAmbos}>Ambos</button>
                <br/>
                <br/>
            </div>
            <div className = "center">
                <button onClick={Back}>Back</button>

            </div>
        </div>
    );
}

export default ChooseMap;