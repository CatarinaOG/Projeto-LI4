import React from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from "react-router-dom";
import {useEffect, useRef, useState} from 'react'
import Select from 'react-select'



function Reservar(){
    const [pratos,setPratos] = useState([]);
    const [numPeople,setNumPeople] = useState(1);
    const pratosSelected = [];
    const [reserva,setReserva] = useState('');

    const nome = useRef(null);
    const data = useRef(null);
    const hora = useRef(null);

    let history = useHistory();

    const data1 = {nothing : ''};

    const getPratos= async () => {
        const response = await fetch('http://127.0.0.1:8080/api/restaurante/info_pratos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data1),
        });
        const pratoss = await response.json();
        setPratos(pratoss);
        
        for(let i=0 ; i<pratos.length; i++){
            pratosSelected[i] = 0;
        }
    }

    useEffect( () => {
        getPratos();
    },[]);

    function handleChange(e){

        let {label, value} = e;
        pratosSelected[value] = label;
        
    }

    function getSelects(){
        const ret = [];
        
        for( let i=0 ; i<numPeople ; i++ ){
            const pratosI = [];
            for (let j = 0 ; j<pratos.length ;j++){
                pratosI.push({label : pratos[j].label , value : i});
            }
            ret.push(<Select style ={{margin: "5px"}} options={pratosI} onChange={(e)=>handleChange(e)}/>);
        }
        
        return ret;
    }

    function Confirm() {

        const info = {
            nome: nome.current.value,
            data: data.current.value,
            hora: hora.current.value,
            num_pessoas: numPeople,
            pratos: pratosSelected,
        };

        fetch('http://127.0.0.1:8080/api/cliente/reserva', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(info),
        })

        let path = '/Restaurante';
        history.push(path);  

    }

    function Back(){
        let path = '/Restaurante';
        history.push(path);        
    }

    return(
        <div>
            <div>
                <h1 className = "title">Reserva Editor</h1>
                <div className = "divGrey">
                    <form className = "form1" action="">
                        <label  for="nome">Nome: </label>
                        <input className = "caixasTextoWhite" type = "text" name = "nome" ref={nome}/>
                        <br/>

                        <label for = "data">Data: </label>
                        <input className = "caixasTextoWhiteLong" type = "date" name = "data" ref={data}/>
                        <br/>

                        <label for = "hora">Hora :</label>
                        <input className = "caixasTextoWhiteLong" type = "time" name = "hora" ref={hora}/>
                        <br/>

                        <label  for="numPessoas">Número de Pessoas </label>
                        <input className = "caixasTextoWhite" type  = "text" name = "numPessoas" value={numPeople} onChange={(e) => setNumPeople(e.target.value)}/>

                    </form>
                </div>

            </div>

            <h1 className = "colorWhiteIndent">Detalhes do pedido</h1>
            <div class = "divGrey">        
                <h1>Selecione o prato : </h1>
                {getSelects()}

                <div className="center">
                    <button className = "button" onClick={Confirm}>Confirmar</button>
                    <button className = "button" onClick={Back}>Cancelar</button>

                </div>

            </div>
        </div>
    );
}

export default Reservar;