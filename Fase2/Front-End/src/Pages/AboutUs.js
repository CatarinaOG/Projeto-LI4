import React from 'react';
import { useHistory } from "react-router-dom";



function AboutUs(){
    
    const history = useHistory();


    function Back(){
        let path = '/FrontPageUser';
        history.push(path);
    }

    return(
        <div className = "bodyAboutUs">
            <h1 className="titleAboutUs">About Us</h1>
            <div>
                
            </div>
            <h3>A equipa</h3>
            <p> Este software foi resolvido no ambito da cadeira de Laboratórios de Informática IV, no 3º ano da Licenciatura de Engenharia Informática na Universidade do Minho.</p>
            <p> A implementação foi realizada pelo Grupo 4, constituído pelos seguintes membros: </p>
            <ul>
                <li>Ana Catarina Gonçalves, a93259</li>
                <li>Bruno Filipe Miranda Pereira, a93298</li>
                <li>Francisco José Martinho Toldy, a93226</li>
                <li>João Pedro Fontes Delgado, a93240</li>
            </ul>
            
            
            <div className = "imagens">
                <img className = "imagem" src="francesinha.png" alt=""/>
                <img className = "imagem" src="braga mapa.png" alt=""/>
            </div>

            <div style = {{textAlign : "center"}}>
                <button onClick={Back}>Go Back</button>
            </div>
            <br/>
        </div>
    );
}

export default AboutUs;