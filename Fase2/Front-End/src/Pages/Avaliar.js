import React from 'react';
import { useHistory } from "react-router-dom";
import { useRef } from "react";


function Avaliar(){

    const history = useHistory();

    const estrelas = useRef(null);
    const comentario = useRef(null);


    function handleSubmit() {
        var data1 = {
            estrelas : estrelas.current.value,
            comentario : comentario.current.value,
        };

        fetch('http://127.0.0.1:8080/api/cliente/avaliacao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data1),
            })
    }

    function Back() {
        let path = '/Restaurante';
        history.push(path);         
    }

    return(
        <div>
            <h1 className = "title">Avaliação Editor</h1>
            <div className = "divGrey">
                <form className = "formStyle" action="" onSubmit={handleSubmit}>
                    
                    <label for="estrelas">Numero de estrelas:</label>
                    <select className = "estrelasInput" name="estrelas" id="estrelas" ref={estrelas}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <br/>
                    <br/>
                    <label for = "labels">Coloque a sua opinião aqui:</label>
                    <br/>
                    <textarea className = "textoAval" id="textoAval" name="textoAval" rows="20"  ref={comentario}></textarea>
                    <br/>

                    <button type='submit'>Confirmar</button>
                    <button  onClick={Back}>Back</button>

                </form>
            </div>
        </div>
    );
}

export default Avaliar;