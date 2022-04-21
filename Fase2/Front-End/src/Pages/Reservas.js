import React from 'react';
import { useHistory } from "react-router-dom";
import Select from 'react-select'
import {useEffect, useRef, useState} from 'react';

function Reservas(){

    let history = useHistory();
    const [reservas, setReservas] = useState([]);
    const data1 = {nothing:''};

    
    const getRestaurants = async () => {
        const response = await fetch('http://127.0.0.1:8080/api/cliente/get_reservas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data1),
        });
        const reservass = await response.json();
        setReservas(reservass);
    }

    useEffect( () => {
        getRestaurants();
    },[]);


    function getPratos(pratos){

        let ret = "";
        let i = 0;

        for( i ; i<pratos.length-1 ; i++){
            ret = ret + pratos[i] + " + "
        }

        ret = ret + pratos[i];
        return ret;
    }

    function Back() {
        let path = '/FrontPageUser';
        history.push(path);
    }


    return(
        <div>
            <h1 className = "colorWhiteIndent">As minhas Reservas : </h1>
            <div className = "divGrey">
                {
                    reservas.map((reserva) => (
                        <div className="divAvaliacao">
                            <p style={{color:"black"}}>Restaurante: {reserva.nome_restaurante}</p>
                            <p style={{color:"black"}}>Dia: {reserva.data}</p>
                            <p style={{color:"black"}}>Hora: {reserva.hora}</p>
                            <p style={{color:"black"}}>Número de pessoas: {reserva.num_pessoas}</p>
                            <p style={{color:"black"}}>Representante: {reserva.nome}</p>
                            <p style={{color:"black"}}>Pratos: {getPratos(reserva.pratos)}</p>

                        </div>  
                    ))
                }
                <div className = "center">
                    <button  onClick={Back}>Back</button>
                </div>
            </div>
        </div>

    );
}

export default Reservas;