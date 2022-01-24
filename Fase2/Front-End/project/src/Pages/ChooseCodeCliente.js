import React from "react";
import {useEffect, useState} from 'react'
import Select from 'react-select'
import { useHistory } from "react-router-dom";



function ChooseCodeCliente(){

    let history = useHistory();

    const [descricoes,setDescricoes] = useState([]);
    const [selected, setSelected] = useState('');

    const data1 = { nothing: ''};

    
    const getDescricoes = async () => {
        fetch('http://127.0.0.1:8080/api/cliente/get_todos_codigos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data1),
        })
        .then(response => response.json())
        .then(data => setDescricoes(data));
    }

    useEffect( () => {
        getDescricoes();
    },[]);

    function handleChange(e) {
        setSelected(e.value);
    }

    async function Confirmar() {
        const data1 = {
            descricao: selected,
        }

        console.log(data1);

        fetch('http://127.0.0.1:8080/api/cliente/set_codigo_atual', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data1),
        })
        .then(response => console.log(response))
        .catch((error) => {
            console.error('Error:', error);
        });
    } 

    function ChooseCode() {

        let path = '/CodeClient';
        history.push(path);

    }


    function Back() {
        let path = '/FrontPageUser';
        history.push(path);
    }


    return(
        <div className = "divGrey">
            <h1 className = "center">Selecione o codigo que deseja aceder : </h1>
            <Select options={descricoes} onChange={handleChange}/>
            <div className = "center">
                <button onClick={Confirmar}>Confirmar</button>
                <button onClick={ChooseCode}>Ver código</button>
                <button onClick={Back}>Back</button>
            </div>
        </div>
    );
}

export default ChooseCodeCliente;
